import { useEffect, useState } from "react";
import {
  Button,
  HelperText,
  Textfield,
  Typography,
} from "../../Components/Atoms";
import { ModalAtom } from "../../Components/Molecules";
import { handleCustomError } from "../../Utils/helper";
import { GET_PROJECT_PROVIDER } from "../../sevices";

interface item {
  id: "";
  name: "";
  Experiences: [
    {
      position: "";
    }
  ];
  selected_status: boolean;
}
const AddProviderPop = ({ open, close, formik , emailformik, loader }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataProvider, setDataProvider] = useState<item[]>([]);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [searchVal, setSearchVal] = useState("")
  const [filter, setFilter] = useState({
    search: "",
    sortBy: "asc",
    pageNo: "",
    pageSize: "10",
    filterBy: "NAME",
  });
  async function handleGetProjectProvider() {
    try {
      setIsLoading(true);
      const query = "?" + new URLSearchParams(filter).toString();
      let { data, status } = await GET_PROJECT_PROVIDER(query);
      if (status === 200) {
        setDataProvider([...data]);
      }

      if (+filter.pageSize === 10) {
        setHasMoreData(false);
      } else {
        setHasMoreData(data.length === dataProvider.length);
      }
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddProvider(element: any) {
    formik.setFieldValue("provideMembers", [
      ...formik.values.provideMembers,
      element,
    ]);
  }
  function handleCancelProvider(mem: any) {
    let fil = formik.values.provideMembers.filter(
      (item: any) => item.id !== mem.id
    );
    formik.setFieldValue("provideMembers", fil);
  }

  function handleOnChangeSearch(val: any) {
    setSearchVal(val)
  }

  useEffect(() => {
    handleGetProjectProvider();
  }, [filter]);

  useEffect(() => {
    let settimeid = setTimeout(() => {
      if (!searchVal) {
        setFilter({ ...filter, search: "" })
      }
      setFilter({ ...filter, search: searchVal })
    }, 800)
    return () => clearTimeout(settimeid)
  }, [searchVal])

  return (
    <ModalAtom
      
      close={close}
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
        <form onSubmit={formik.handleSubmit} className="py-5 px-5">
          <Typography
            label="Enter Team Name"
            color="primary"
            variant={200}
            type="h2"
            classname="font-bold "
          />
          <Textfield name="teamName" 
          placeHolder="Enter here"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.teamName}
          />
          {formik.touched.teamName && formik.errors.teamName && (
            <HelperText
              position="right"
              label={formik.errors.teamName}
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

          <div className="flex flex-col-reverse lg:flex-row lg:space-x-[20px] ">
            <div className="w-full mt-[20px]">
              <div className="border-b-[1px] border-text-gray-50 ">
                <Typography
                  label="Provider’s List"
                  type="h3"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                />
              </div>
              <div className="w-[599px] h-[276px] shadow-navbar  rounded-[5px] mt-[10px] overflow-y-auto">
                <div className=" w-full  pl-[10px] pt-[10px] pb-[10px] pr-[20px]  border-text-gray-50 border-b-[1px]">
                  <Textfield
                    type="search"
                    placeHolder="Search name, skill or user id"
                    onChange={(e:any)=>{
                      handleOnChangeSearch(e.target.value)
                    }}
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
                {/* //!profile */}
                {isLoading? <div className="text-center">Loading...</div> : dataProvider.map((element, index) => {
                  let findmem = formik.values.provideMembers.find(
                    (item: any) => item.id === element.id
                  );
                  return (
                    <div
                      key={index}
                      className="border-b-[1px] border-text-gray-50 p-[10px] flex justify-between "
                    >
                      <div className="flex space-x-[13px]">
                        <div className="bg-slate-400 w-[60px] rounded-full flex justify-center items-center uppercase font-bold text-white text-3xl">
                          {element.name.charAt(0)}
                        </div>
                        <div>
                          <Typography
                            label={element.name}
                            color="primary"
                            variant={200}
                            classname="font-medium capitalize"
                            type="h4"
                            FontSize="base"
                          />
                          <Typography
                            label={element?.Experiences[0]?.position || "-"}
                            color="primary"
                            variant={200}
                            classname="font-medium uppercase"
                            type="p"
                            FontSize="xs"
                          />
                          <Typography
                            label={`ID: ${element.id}`}
                            color="primary"
                            variant={50}
                            classname="font-medium "
                            type="p"
                            FontSize="xxs"
                          />
                        </div>
                      </div>
                      <div className="w-[131px]">
                        {!findmem ? (
                          <Button
                            variant="Transparent"
                            color="secondary"
                            label="Add Provider"
                            size="small"
                            onClick={() => {
                              handleAddProvider(element);
                            }}
                          />
                        ) : (
                          <Button
                            variant="Transparent"
                            color="secondary"
                            label="Cancel"
                            size="small"
                            onClick={() => {
                              handleCancelProvider(element);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* //!second section */}
            <div className=" w-full mt-[20px]  ">
              <div className="border-b-[1px] border-text-gray-50 ">
                <Typography
                  label="Invite Through Mail"
                  type="h3"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                />
              </div>
              <form onSubmit={emailformik.handleSubmit} className=" h-[80px] rounded-[5px] shadow-navbar mt-[20px] mr-[20px] p-[20px] flex space-x-[20px]">
                <Textfield
                  type="text"
                  placeHolder="Enter Mail here"
                  name="email"
                  onChange={emailformik.handleChange}
                  onBlur={emailformik.handleBlur}
                  value={emailformik.values.email}
                />

                <div className="w-[100px]">
                  <Button                    
                    label="Add Mail"
                    type="submit"
                    color="secondary"
                    variant="Transparent"
                    size="small"
                    onClick={(e:any)=>{
                      e.preventDefault()
                      emailformik.handleSubmit()
                    }}
                  />
                </div>
              </form>
                {emailformik.touched.email && emailformik.errors.email && (
                  <HelperText
                    position="right"
                    label={emailformik.errors.email}
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

              <div className="border-b-[1px] border-text-gray-50 mt-[16px] ">
                <Typography
                  label="Providers"
                  type="h3"
                  FontSize="sm"
                  color="primary"
                  variant={200}
                  classname="font-bold "
                />
              </div>
              <div className="rounded-[5px] h-[142px] shadow-navbar mt-[10px] p-[20px] flex space-x-[10px]">
                <div className="w-[419px] h-[109px] border-[1px] border-text-gray-50 rounded-[5px] p-[10px]  space-y-[1px] flex flex-row gap-5 flex-wrap overflow-auto">
                  {formik.values.provideMembers.map((mem: any, index: any) => {
                    return (
                      <div key={index} className="flex space-x-[4px] h-fit">
                        <Typography
                          label={mem.name}
                          type="p"
                          color="primray"
                          variant={300}
                          FontSize="sm"
                          classname="capitalize"
                        />
                        <Button
                          label=""
                          icon={
                            <img
                              src="/Assets/Error.svg"
                              className="mt-[-8px]"
                              alt=""
                            />
                          }
                          variant="line"
                          onClick={() => {
                            handleCancelProvider(mem);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Button
                    label="clear List"
                    variant="line"
                    size="small"
                    className="text-text-secondary-50 "
                    onClick={() => {
                      formik.setFieldValue("provideMembers", []);
                    }}
                  />
                </div>
              </div>
              {formik.touched.provideMembers && formik.errors.provideMembers && (
                  <HelperText
                    position="right"
                    label={formik.errors.provideMembers}
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
              <div className="flex justify-end  mt-[20px] mr-[20px]">
                <div className="w-[100px]">
                  <Button type="submit" label="Confirm" size="small" disable={loader} />
                </div>
              </div>
            </div>
            {/* //Bottom Button */}
          </div>
        </form>
      }
      PanelPosition={
        "lg:w-[1178px]  h-fit overflow-y-auto lg:overflow-hidden  shadow-popUps"
      }
      open={open}
    />
  );
};

export default AddProviderPop;
