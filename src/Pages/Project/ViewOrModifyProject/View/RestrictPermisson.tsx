import { useCallback, useEffect, useState } from "react";
import { Button, CheckBoxAtom, Typography } from "../../../../Components/Atoms";

const RestrictPermisson = ({ formik, viewProjectData, activeBtn }: any) => {
  const { ipPermissions } = viewProjectData
  const [OpenIndex, setOpenIndex] = useState<any>([0]);
  const [fields, setFields] = useState<any>([]);
  const [tempPermissons, settempPermissons] = useState<any>([]);
  const toggleFAQ = (index: number) => {
    setOpenIndex((prevOpenIndex: any) => {
      const isOpen = prevOpenIndex.includes(index);
      if (isOpen) {
        // If openIndex includes index, remove it
        return prevOpenIndex.filter((i: any) => i !== index);
      } else {
        // If openIndex does not include index, add it
        return [...prevOpenIndex, index];
      }
    });
  };
  useEffect(() => {
    switch (activeBtn) {
      case "Project Details":
        setFields([{
          name: 'ProjectDetailsDuration',
          label: 'Duration'
        },
        {
          name: 'ProjectTotalProjectFund',
          label: 'Project Fund'
        }])
        break;

      case "Documents":
        setFields([
          {
            name: 'DocumentTermsAndConditions',
            label: 'Term And Condition'
          }])
        break;

      case "Provider":
        setFields([{
          name: 'Members',
          label: 'Members'
        }])

        break;

      case "Milestones":
        setFields([{
          name: 'MilestoneFundAllocation',
          label: 'Fund Allocation'
        },
        {
          name: 'MilestoneRevisionsCounter',
          label: 'Revision Counter'
        }])
        break;

      case "Escrow":
        setFields([
          {
            name: 'EscrowProjectDetails',
            label: 'Project Details'
          },
          {
            name: 'EscrowpartiesInvolved',
            label: 'Parties Involved'
          },
          {
            name: 'MilestoneFundAllocation',
            label: 'Milestone Fund'
          },
          {
            name: 'EscrowRoyalty',
            label: 'Royalty'
          },
          {
            name: 'EscrowPenalty',
            label: 'Penalty'
          }
        ]);;
        break;

      case "Funds":
        setFields([{
          name: 'FundsTab',
          label: 'Entire Fund Tab'
        },
        {
          name: 'FundAllocation',
          label: 'Fund Allocation'
        },
        {
          name: 'FundLeft',
          label: 'Fund Left'
        }]);
        break;

      default:
        console.log("Invalid input");
        break;
    }
  }, [activeBtn])

  const getKeysFromActiveBtn = () => {
    switch (activeBtn) {
      case "Project Details":
        return ['ProjectDetailsDuration', 'ProjectTotalProjectFund'];

      case "Documents":
        return ['DocumentTermsAndConditions'];

      case "Provider":
        return ['Members'];

      case "Milestones":
        return ['MilestoneFundAllocation', 'MilestoneRevisionsCounter'];

      case "Escrow":
        return [
          'EscrowProjectDetails',
          'EscrowpartiesInvolved',
          'MilestoneFundAllocation',
          'EscrowRoyalty',
          'EscrowPenalty'
        ];

      case "Funds":
        return ['FundsTab','FundAllocation', 'FundLeft'];

      default:
        return [];
    }
  }

  const performAndOperationForAll = useCallback((keys: string[]) => {
    return tempPermissons && tempPermissons.reduce((result: any, currentObj: any) => {
      return result && keys.every(key => currentObj[key]);
    }, true);
  }, [tempPermissons]);

  const performAndOperation = useCallback((key: string) => {
    return tempPermissons && tempPermissons.reduce((result: any, currentObj: any) => result && currentObj[key], true);
  }, [tempPermissons]);

  const handleAllPermisson = (e: any, id: string) => {
    let value = e.target.checked
    let updatedData = updateAllObject(value)
    settempPermissons(updatedData)
    formik.setFieldValue("Permissions", updatedData)
  }
  function updateAllObject(value: any) {
    let data = formik.values.Permissions
    const resultObject = fields && fields.length > 0 && fields.reduce((acc: any, curr: any) => {
      acc[curr.name] = value;
      return acc;
    }, {});
    const updatedObjects = data && data.length > 0 && data.map((obj: any) => {
      return { ...obj, ...resultObject };
    });
    return updatedObjects;
  }
  const handlePermissons = (e: any, id: string) => {
    let name = e.target.name
    let value = e.target.checked
    let updatedData = updateObjectById(id, name, value)
    settempPermissons(updatedData)
    formik.setFieldValue("Permissions", updatedData)
  }

  function updateObjectById(id: string, name: string, value: any) {
    let data = formik.values.Permissions
    const updatedObjects = data && data.length > 0 && data.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, [name]: value };
      } else if (id == 'all') {
        return { ...obj, [name]: value };
      }
      return obj;
    });
    return updatedObjects;
  }

  return (
    <div className="shadow-navbar px-5 py-5 w-full sm:w-1/3  rounded-[5px] h-max">
      <Typography
        label="Note: You can Restrict information from Individual Provider."
        FontSize="xs"
        type="p"
        color="primary"
        variant={300}
      />
      <div className="mt-5 shadow-navbar p-[10px] rounded-[5px]">
        <CheckBoxAtom
          checked={performAndOperationForAll(getKeysFromActiveBtn())}
          Onchange={(e: any) => handleAllPermisson(e, 'all')}
          label={
            <Typography
              label={"Show all information to all IP’s"}
              color="primary"
              variant={300}
              type="p"
              FontSize="sm"
            />
          }
        />
      </div>
      <div className="mt-5 shadow-navbar p-[10px] rounded-[5px] flex-col gap-[5px] w-full">
        <Typography
          label={"Show information to all IP’s"}
          classname="font-bold "
          FontSize="sm"
          type="p"
          color="primary"
          variant={300}
        />
        {fields.map((field: any, index: any) => (<CheckBoxAtom
          key={`${index}-${field?.name}-ipallsetting`}
          Name={field?.name}
          checked={performAndOperation(field?.name)}
          Onchange={(e: any) => handlePermissons(e, 'all')}
          label={
            <Typography
              label={field?.label}
              color="primary"
              variant={300}
              type="p"
              FontSize="sm"
            />
          }
        />))}
      </div>

      {formik.values.Permissions && formik.values.Permissions.length > 0 && formik.values.Permissions.map((element: any, index: any) => {
        return (
          <div className="mt-5 shadow-navbar rounded-[5px] p-[10px]">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-[5px] items-center">
                <div className="w-8 h-8 min-w-[32px] min-h-[32px] flex justify-center items-center">
                  {element?.User?.About?.profilePictureLink ?
                    <img
                      src={element?.User?.About?.profilePictureLink}
                      className="rounded-full min-w-[32px] min-h-[32px]"
                    /> :
                    <div className="capitalize bg-[#3498db] min-w-[32px] min-h-[32px] flex justify-center items-center w-full rounded-full text-white text-base font-medium ">
                      {element?.User?.name.charAt(0)}
                    </div>}
                </div>
                <Typography
                  label={element?.User?.name}
                  FontSize="base"
                  classname="text-text-HeadLine-100 "
                  type="p"
                />
              </div>
              <div>
                <Button
                  label={""}
                  size="small"
                  variant="line"
                  onClick={() => {
                    toggleFAQ(index);
                  }}
                  icon={
                    OpenIndex === index ? (
                      <img src="/Assets/FAQOpen.svg" alt="Open FAQ" />
                    ) : (
                      <img src="/Assets/FAQClose.svg" alt="Open FAQ" />
                    )
                  }
                />
              </div>
            </div>
            {OpenIndex.includes(index) && (
              <div className="flex flex-col gap-y-[12px] mt-[10px]">
                {fields.map((field: any, index: any) => (
                  <>
                    <CheckBoxAtom
                      key={`${index}-${element?.id}-ipallsetting`}
                      Name={field?.name}
                      checked={element[field?.name]}
                      Onchange={(e: any) => handlePermissons(e, element?.id)}
                      label={
                        <Typography
                          label={field?.label}
                          color="primary"
                          variant={300}
                          type="p"
                          FontSize="sm"
                        />
                      }
                    />
                  </>))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RestrictPermisson;
