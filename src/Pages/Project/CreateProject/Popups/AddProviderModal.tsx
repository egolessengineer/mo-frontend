import { useFormik } from "formik";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import * as yup from "yup";
import { Bookmark } from "../../../../Assets/SVG";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../../../Components/Atoms";
import { ModalAtom } from "../../../../Components/Molecules";
import CustomFilterDropdown from "../../../../Components/Molecules/Structure/CustomFiterDropdown";
import { handleCustomError, showToast } from "../../../../Utils/helper";
import {
  GET_PROJECT_PROVIDER,
  GET_SHORTLIST_PROVIDER_LIST,
  INVITE,
  POST_SHORTLIST_PROVIDER_LIST,
} from "../../../../sevices";

const AddProviderModal = ({ open, close, indexFormik }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeBtn, setactiveBtn] = useState<string>("All");
  const [filter, setFilter] = useState({
    search: "",
    sortBy: "asc",
    pageNo: "",
    pageSize: "10",
    filterBy: "NAME",
  });
  const [searchVal, setSearchVal] = useState("");
  const [dataProvider, setDataProvider] = useState<any>([]);

  const handleClick = (name: string) => {
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

  const toggleBookmark = async (id: any, isBookmark: boolean) => {
    try {
      let action = isBookmark ? 1 : 0;

      let body = {
        providerId: id,
        action: action,
      };

      let fildata;
      if (activeBtn === "All") {
        fildata = dataProvider.map((item: any) => {
          if (action === 0) {
            return item.id === id
              ? { ...item, ProviderListMember: [{ id }] }
              : item;
          } else {
            return item.id === id ? { ...item, ProviderListMember: [] } : item;
          }
        });
      } else {
        fildata = dataProvider.filter((item: any) => item.Member.id !== id);
      }
      await POST_SHORTLIST_PROVIDER_LIST(body);
      setDataProvider(fildata);
      showToast(
        !isBookmark
          ? "saved bookmark successfully"
          : "removed bookmark successfully",
        "success"
      );
    } catch (error: any) {
      handleCustomError(error);
    } finally {
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is Required"),
    }),
    onSubmit: () => {
      handleInviteThroughEmail();
    },
  });

  async function handleInviteThroughEmail() {
    try {
      setIsLoading(true);
      let body = {
        email: formik.values.email,
      };
      await INVITE(body);
      formik.setFieldValue("email", "", false);
      showToast("Invite Sent Successfully", "success");
    } catch (error: any) {
      if (error?.response?.data?.message === "Email already registered") {
        showToast("Email Already Registered", "error");
      } else {
        handleCustomError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleFetchMoreData() {
    setFilter({
      ...filter,
      pageSize: (Number(filter.pageSize) + 10).toString(),
    });
  }

  async function getShortlistProviderList() {
    try {
      setIsLoading(true);
      const query = new URLSearchParams({ sortBy: filter.sortBy }).toString();
      let { data } = await GET_SHORTLIST_PROVIDER_LIST(query);
      setDataProvider(data);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetProjectProvider() {
    try {
      const query = "?" + new URLSearchParams(filter).toString();
      let { data, status } = await GET_PROJECT_PROVIDER(query);
      if (status === 200) {
        setDataProvider([...data]);
      }
    } catch (error: any) {
      handleCustomError(error);
    } finally {
    }
  }

  function handleOnChangeSearch(val: any) {
    setSearchVal(val);
  }

  function handleConfirm() {
    close();
  }

  useEffect(() => {
    if (activeBtn !== "All") {
      getShortlistProviderList();
    } else {
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
    let settimeid = setTimeout(() => {
      if (activeBtn === "All") {
        if (!searchVal) {
          setFilter({ ...filter, search: "" });
        }
        setFilter({ ...filter, search: searchVal });
      } else {
        if (!searchVal) {
          getShortlistProviderList();
        }
        let searchdata = dataProvider.filter((pro: any) =>
          pro.Member.name.toLowerCase().includes(searchVal.toLowerCase())
        );
        setDataProvider(searchdata);
      }
    }, 800);
    return () => clearTimeout(settimeid);
  }, [searchVal]);

  return (
    <ModalAtom
      Title={
        <div className="h-[50px] bg-primary-100 flex justify-between items-center pr-4 flex-row">
          <Typography
            label="Add Provider"
            type="h1"
            classname="text-white font-bold pl-[15px] "
            FontSize="base"
          />
          <Button
            label=""
            icon={<img src="Assets/Close.svg" alt="" />}
            variant="line"
            className="pr-[15px] "
            onClick={close}
          />
        </div>
      }
      description={
        <>
          {" "}
          <div className="md:w-[350px] w-full h-[32px] pt-[20px] pl-[20px] ">
            <Textfield
              type="search"
              onChange={(e: any) => handleOnChangeSearch(e.target.value)}
              value={searchVal}
              placeHolder="Search name, skill or user id"
              className="border-text-primary-100 "
              rightIcon={
                <img
                  src="/Assets/Search.svg"
                  height="36px"
                  width="36px"
                  className="rounded-[5px] mt-[1.5px] cursor-auto"
                  alt=""
                />
              }
            />
          </div>
          {/* //!body */}
          <div className=" flex flex-col-reverse  lg:flex-row p-5 mt-[26px] gap-5 max-h-[90vh] overflow-auto-y">
            <div className="lg:w-[66%] w-full">
              <div className="flex justify-between border-b-[1px] border-text-gray-50 ">
                <Typography
                  label="Providers List"
                  type="h2"
                  color="primary"
                  variant={300}
                  classname="font-bold "
                  FontSize="sm"
                />
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
              </div>
              <div className="flex gap-3 pl-2">
                <Button
                  variant="line"
                  label="All"
                  className={`pl-[6px] text-text-primary-300 font-bold text-sm leading-5 ${activeBtn === "All"
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
              </div>
              {/* //!card */}

              <div
                id="scrollableDivproviderlist"
                className="flex flex-col rounded-[5px]  shadow-navbar overflow-x-hidden overflow-y-scroll min-h-full max-h-full"
                style={{ height: "calc(100vh - 400px)" }}
              >
                <InfiniteScroll
                  dataLength={dataProvider.length}
                  next={handleFetchMoreData}
                  hasMore={true}
                  loader={
                    <h4 className="text-center">
                      {isLoading
                        ? "Loading..."
                        : dataProvider.length === 0
                          ? "No data"
                          : null}
                    </h4>
                  }
                  scrollableTarget="scrollableDivproviderlist"
                >
                  {dataProvider &&
                    dataProvider.length > 0 &&
                    dataProvider.map((Element: any, index: any) => {
                      let id = Element?.id || "";
                      id?.toString();
                      return (
                        <div
                          key={id}
                          className="h-[74px]   border-b-[1px] border-text-gray-50 flex"
                        >
                          <div className="mt-[10px] ml-[10px] mb-[14px]  ">
                            <div className="w-[50px] h-full capitalize bg-text-HeadLine-100 rounded-full flex justify-center items-center text-xl font-bold text-white">
                              {Element?.name
                                ? Element?.name.trim().charAt(0)
                                : Element?.Member?.name.trim().charAt(0)}
                            </div>
                          </div>
                          <div className="flex flex-col pl-[13px] pt-[9px] w-[100%]">
                            <Typography
                              label={Element?.name || Element?.Member?.name}
                              type="p"
                              FontSize="base"
                              color="primary"
                              variant={200}
                              classname="font-medium leading-6 capitalize"
                            />
                            <Typography
                              label={
                                Element?.Experiences
                                  ? Element.Experiences[
                                    Element?.Experiences.length - 1
                                  ]?.position
                                  : Element.Member.Experiences[
                                    Element?.Member?.Experiences.length - 1
                                  ]?.position
                              }
                              type="p"
                              FontSize="xs"
                              color="primary"
                              variant={300}
                              classname=" leading-4 uppercase"
                            />
                            <div className="flex">
                              <Typography
                                label="ID:"
                                type="p"
                                FontSize="xs"
                                color="primary"
                                variant={300}
                                classname=" leading-4 "
                              />
                              <Typography
                                label={id}
                                type="p"
                                FontSize="xs"
                                color="primary"
                                variant={300}
                                classname=" leading-4 "
                              />
                            </div>
                          </div>
                          <div className="flex justify-end items-center m-[20px]">
                            <div className="w-[131px] flex gap-2">
                              <Button
                                onClick={() =>
                                  indexFormik.values.provider?.id === Element.id
                                    ? indexFormik.setFieldValue("provider", {
                                      id: "",
                                      name: "",
                                    })
                                    : indexFormik.setFieldValue("provider", {
                                      id: Element?.id,
                                      name: Element?.name,
                                    })
                                }
                                label={
                                  indexFormik.values.provider?.id === Element.id
                                    ? "Remove"
                                    : "Add"
                                }
                                variant="Transparent"
                                color="secondary"
                                size="small"
                                className=""
                                disable={
                                  indexFormik.values.provider?.id !== "" &&
                                  indexFormik.values.provider?.id !==
                                  Element?.id
                                }
                              />
                              {
                                <Button
                                  label=""
                                  variant="line"
                                  onClick={() => {
                                    let isBookMark =
                                      activeBtn !== "All"
                                        ? true
                                        : Element?.ProviderListMember.length !==
                                          0
                                          ? true
                                          : false;
                                    let id =
                                      activeBtn !== "All"
                                        ? Element?.Member.id
                                        : Element?.id;
                                    toggleBookmark(id, isBookMark);
                                  }}
                                  icon={
                                    <Bookmark
                                      clicked={
                                        activeBtn === "All"
                                          ? Element?.ProviderListMember &&
                                          Element?.ProviderListMember
                                            .length !== 0
                                          : true
                                      }
                                    />
                                  }
                                />
                              }
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </InfiniteScroll>
              </div>
            </div>
            {/* //!right */}
            <div className="lg:w-[30%] w-full mt-[10px]">
              <div className="border-b-[1px] pb-5 border-text-gray-50">
                <Typography
                  label="Invite Through Mail"
                  type="h2"
                  color="primary"
                  variant={300}
                  classname="font-bold "
                  FontSize="sm"
                />
              </div>
              <div className="flex flex-col gap-5 ">
                <form
                  onSubmit={formik?.handleSubmit}
                  className="md:w-[366px] h-[54px] shadow-navbar rounded-[5px] mt-[10px]"
                >
                  <div className="flex p-[10px] gap-[10px] justify-between items-center">
                    <div className="lg:w-[236px] w-full ">
                      <Textfield
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onReset={formik.handleReset}
                        className="border-text-gray-50"
                      />
                    </div>

                    <div className="w-[100px]">
                      <Button
                        onClick={formik.handleSubmit}
                        disable={isLoading}
                        type="submit"
                        size="small"
                        label="Add Mail"
                        variant="Transparent"
                        color="secondary"
                      />
                    </div>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <HelperText
                      position="right"
                      label={formik.errors.email}
                      className="text-xxs "
                      color="danger"
                      icon={
                        <img
                          src="/Assets/Danger.svg"
                          alt=""
                          className="pt-[6px] ml-[4px]"
                        />
                      }
                    />
                  )}
                </form>
                <div className="border-b-[1px] border-text-gray-50  pb-[5px]">
                  <Typography
                    label="Providers"
                    type="h2"
                    color="primary"
                    variant={300}
                    classname="font-bold "
                    FontSize="sm"
                  />
                </div>
                {/* //!providerlist */}
                <div className="md:w-[366px]  shadow-navbar">
                  <div className="m-[10px] border-[1px] border-text-gray-50 md:w-[346px] h-[176px] rounded-[5px] ">
                    {indexFormik.values.provider?.name ? (
                      <div className="flex flex-wrap gap-x-[10px] p-[10px] ">
                        <Typography
                          label={indexFormik.values.provider?.name}
                          type="p"
                          variant={200}
                          color="primary"
                          FontSize="sm"
                          classname="capitalize"
                        />
                        <HelperText
                          className="cursor-pointer"
                          onClick={() =>
                            indexFormik.setFieldValue("provider", {
                              id: "",
                              name: "",
                            })
                          }
                          label=""
                          icon={
                            <img
                              src="/Assets/Error.svg"
                              className="mt-[3px]"
                              alt="remove"
                            />
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="flex justify-end mr-[20px] ">
                    <Button
                      label=" Clear list "
                      onClick={() =>
                        indexFormik.setFieldValue("provider", {
                          id: "",
                          name: "",
                        })
                      }
                      variant="line"
                      size="small"
                      className="text-text-secondary-50 font-medium "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end  p-5">
            <div className="w-[100px]">
              <Button
                onClick={handleConfirm}
                label="Confirm"
                size="small"
                variant="standard"
                color="primary"
              />
            </div>
          </div>
        </>
      }
      PanelPosition={"lg:w-[1178px] w-full  shadow-popUps"}
      open={open}
    />
  );
};

export default AddProviderModal;
