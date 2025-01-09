import { useFormik } from "formik";
import _debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Textfield } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { Structure } from "../../Components/Molecules";
import CustomFilterDropdown from "../../Components/Molecules/Structure/CustomFiterDropdown";
import { handleCustomError, showToast } from "../../Utils/helper";
import { GET_PROJECT_PROVIDER, GET_SHORTLIST_PROVIDER_LIST, UPDATE_TEAM } from "../../sevices";
import ProviderListDisplay from "./ProviderListDisplay";
import { SelectTeamPopup } from "./SelectTeamPopup";

const ProviderList = () => {
  const [activeBtn, setactiveBtn] = useState<string>("All");
  const [showselectteamPopup, setShowSelectTeamPopup] = useState(false);
  const [tabeChangeLoader, setTabChangeLoader] = useState(false)

  const handleClick = (name: string) => {
    setDataProvider([])
    setactiveBtn(name);
    if (activeBtn !== name && name === "shortlisted") {
      getShortlistProviderList();
    } else if (activeBtn !== name && name === "All") {
      handleGetProjectProvider();
    }



    setFilter({
      search: "",
      sortBy: "asc",
      pageNo: "",
      pageSize: "10",
      filterBy: "NAME",
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [dataProvider, setDataProvider] = useState<any>([]);
  const [filter, setFilter] = useState({
    search: "",
    sortBy: "asc",
    pageNo: "",
    pageSize: "10",
    filterBy: "NAME",
  });
  const [searchVal, setSearchVal] = useState("");

  function handleFetchMoreData() {
    setFilter({
      ...filter,
      pageSize: (Number(filter.pageSize) + 10).toString(),
    });
  }

  const formik = useFormik({
    initialValues: {
      userId: "",
      teamName: "",
      teamId: "",
    },
    validationSchema: Yup.object({
      teamId: Yup.string().required("Team is Required"),
    }),
    onSubmit: (value, { resetForm }) => {
      handleAddTeam();
      resetForm();
    },
  });

  async function handleAddTeam() {
    try {
      setIsLoading(true);
      let body = {
        id: formik.values.teamId,
        usersId: [formik.values.userId],
        action: 2,
      };
      let res = await UPDATE_TEAM(body);
      showToast("Team Member Added", "success");
      handleCloseteamPopup();
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getShortlistProviderList() {
    try {
      setIsLoading(true)
      const query = new URLSearchParams({ sortBy: filter.sortBy }).toString();
      let { data, status } = await GET_SHORTLIST_PROVIDER_LIST(query);
      setDataProvider(data)
    } catch (error: any) {
    } finally {
      setIsLoading(false)
    }
  }


  async function handleGetProjectProvider() {
    try {
      setIsLoading(true)
      setTabChangeLoader(dataProvider.length === 0 ? true : false)
      const query = "?" + new URLSearchParams(filter).toString();
      let { data, status } = await GET_PROJECT_PROVIDER(query);
      if (status === 200) {
        setDataProvider([...data]);
      }

      if (Number(filter.pageSize) === 10) {
        setHasMoreData(false);
      } else {
        setHasMoreData(data.length === dataProvider.length);
      }


    } catch (error: any) {
    } finally {
      setIsLoading(false)
      setTabChangeLoader(false)
    }
  }

  function handleOnChangeSearch(val: any) {
    setSearchVal(val);
  }

  function handleOpenteamPopup() {
    setShowSelectTeamPopup(true);
  }

  function handleCloseteamPopup() {
    setShowSelectTeamPopup(false);
  }



  useEffect(() => {
    if (activeBtn !== "All") {
      getShortlistProviderList()
    }
    else {
      handleGetProjectProvider();
    }
  }, [
    filter.filterBy,
    filter.pageNo,
    filter.pageSize,
    filter.search,
    filter.sortBy,
  ]);

  useEffect(() => {
    let debounceFun = _debounce(() => {
      if (activeBtn === "All") {
        if (!searchVal) {
          setFilter({ ...filter, search: "" });
        }
        setFilter({ ...filter, search: searchVal });
      }
      else {
        if (!searchVal) {
          getShortlistProviderList()
        }
        let searchdata = dataProvider.filter((pro: any) => pro.Member.name.toLowerCase().includes(searchVal.toLowerCase()))
        setDataProvider(searchdata)
      }
    }, 1000);
    debounceFun()
    return () => {
      debounceFun.cancel();
    };
  }, [searchVal]);
  return (
    <>
      <Structure
        Heading={"Provider List"}
        optionText={
          <>
            <Button
              variant="line"
              label="All"
              className={`pl-[6px] text-text-primary-300 font-bold text-sm leading-5 ${activeBtn == "All"
                  ? "border-b-4 border-text-secondary-50  text-text-secondary-50"
                  : ""
                }  `}
              onClick={() => {
                handleClick("All");
              }}
              size="small"
            />
            <Button
              size="small"
              variant="line"
              label="Shortlisted"
              onClick={() => {
                handleClick("shortlisted");
              }}
              className={`pl-[6px] text-text-primary-300 font-bold text-sm leading-5  
          ${activeBtn === "shortlisted"
                  ? "border-b-4 border-text-secondary-50  text-text-secondary-50"
                  : ""
                }
           `}
            />
          </>
        }
        mainSection={
          <div>
            <div className="lg:w-[350px] w-full  mt-[10px] border-text-gray-50 border-1 ">
              <Textfield
                placeHolder="Search name, skill or user id"
                type="search"
                onChange={(e: any) => handleOnChangeSearch(e.target.value)}
                value={searchVal}
                rightIcon={
                  <img
                    src="/Assets/Search.svg"
                    height="36px"
                    width="36px"
                    className="rounded-[5px] mt-[1.5px]"
                    alt=""
                  />
                }
              />
            </div>
            <br />
            {tabeChangeLoader ? <Loader /> : <ProviderListDisplay
              loader={isLoading}
              handleOpenteamPopup={handleOpenteamPopup}
              dataProvider={dataProvider}
              setDataProvider={setDataProvider}
              handleFetchMoreData={handleFetchMoreData}
              hasMoreData={hasMoreData}
              formik={formik}
              activeBtn={activeBtn}
            />}
          </div>
        }
        Buttons={
          <>
            <div className="flex space-x-[26px] pb-[5px]">
              <div className="relative">
                <CustomFilterDropdown
                  Title="Sort By"
                  value={filter.sortBy}
                  onChange={(selected) => {
                    setFilter({
                      ...filter,
                      sortBy: selected.toString(),
                    });
                  }}
                  options={[{ key: "asc", value: 'Ascending' }, { key: "desc", value: 'Descending' }]}
                  icon={<img src="/Assets/Sort.svg" alt="" />}
                  iconPosition="left"
                />
              </div>
            </div>
          </>
        }
      />
      {showselectteamPopup && (
        <SelectTeamPopup
          loader={isLoading}
          open={showselectteamPopup}
          close={handleCloseteamPopup}
          formik={formik}
        />
      )}
    </>
  );
};

export default ProviderList;
