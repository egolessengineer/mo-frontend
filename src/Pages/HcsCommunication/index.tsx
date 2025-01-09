import {
  Client,
  TopicId,
  TopicMessageSubmitTransaction,
  TransactionId,
  TransactionReceiptQuery,
} from "@hashgraph/sdk";
import { useFormik } from "formik";
import _debounce from "lodash/debounce";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Button } from "../../Components/Atoms";
import { Structure } from "../../Components/Molecules";
import { AuthState } from "../../Context/auth";
import { HashConnectAPIContext } from "../../Providers/HasConnectAPIProvider";
import { handleCustomError, showToast } from "../../Utils/helper";
import {
  GET_PROJECT,
  GET_PROJECT_NOTES,
  PROJECT_CHAT_LIST,
  SEND_PROJECT_NOTES,
} from "../../sevices";
import SendNotePopUp from "./HcsPopUp/SendNotePopUp";
import NoteHistory from "./NoteHistory";

const Index = () => {
  const [sendNote, setsendNote] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [project, setProject] = useState();
  const [projectDetails, setProjectDetails] = useState<any>();
  const [projectsNotes, setProjectNotes] = useState<any>();
  const [members, setMembers] = useState();
  const [milestonesData, setMilestonesData] = useState();
  const [dropdownload, setDropdownLoad] = useState(false);
  const [refetchData, setRefetchData] = useState(false);
  const [replyNotes, setReplyNotes] = useState<any>();
  const [notepopup, setNotepopup] = useState(false);
  const [searchval, setSearchVal] = useState("");

  const { user } = AuthState();

  const { getProvider, getSigner, state } = useContext(HashConnectAPIContext);

  const OpenSend = () => {
    if (state === "Connected") {
      setsendNote(true);
    } else {
      showToast("Please Connect Your Wallet First", "error");
    }
  };
  const CloseSend = () => {
    setsendNote(false);
  };

  const validations = () => {
    if (sendNote) {
      return Yup.object({
        toName: Yup.string().required("Required"),
        milestoneName: Yup.string().required("Required"),
        message: Yup.string().required("Required"),
      });
    } else if (notepopup) {
      return Yup.object({
        replymsg: Yup.string().required("Required"),
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      projectId: projectDetails?.id,
      milestoneId: "",
      milestoneName: "",
      message: "",
      toId: "",
      toName: "",
      noteId: "",
      hcsTopicId: projectDetails?.hcsTopicId || "",
      sequenceNumber: "",

      replymsg: "",
    },
    enableReinitialize: true,
    validationSchema: validations(),
    onSubmit: (val, { resetForm }) => {
      if (sendNote) {
        handleSendNotes();
        resetForm();
      } else if (notepopup) {
        if (state === "Connected") {

          handleReplySendNote();
          resetForm();
        }
        else {
          showToast("Please Connect Your Wallet First", "error");
        }
      }
    },
  });


  async function handleTopicMessageSubmitTransaction() {
    try {
      const provider = getProvider();
      const signer = getSigner(provider);

      let message = formik.values.message || formik.values.replymsg

      let transaction = await new TopicMessageSubmitTransaction()
        .setTopicId(TopicId.fromString(projectDetails?.hcsTopicId))
        .setMessage(message)
        .freezeWithSigner(signer);


      let transactionResult = await transaction.executeWithSigner(signer)
      let receipt = await new TransactionReceiptQuery()
        .setTransactionId(TransactionId.fromString(transactionResult.transactionId.toString()))
        .execute(Client.forTestnet())

      return receipt?.topicSequenceNumber?.low
    }
    catch (error: any) {
      handleCustomError(error)
    }
  }

  async function handleSendNotes() {
    try {
      setIsLoading(true);

      let sequenceNumber = await handleTopicMessageSubmitTransaction()
      let body = {
        projectId: formik.values.projectId,
        milestoneId: formik.values.milestoneId,
        message: formik.values.message,
        to: formik.values.toId,
        hcsTopicId: formik.values.hcsTopicId,
        sequenceNumber: `${sequenceNumber}`,
      };

      await SEND_PROJECT_NOTES(body);
      setRefetchData(true);
      CloseSend();
      showToast("Send Note Successfully", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReplySendNote() {
    try {
      setIsLoading(true);
      let sequenceNumber = await handleTopicMessageSubmitTransaction()
      let body = {
        projectId: replyNotes?.projectId,
        milestoneId: replyNotes?.milestoneId,
        message: formik.values.replymsg,
        to: user?.id === replyNotes?.from ? replyNotes?.to : replyNotes?.from,
        noteId: replyNotes?.id,
        hcsTopicId: replyNotes?.hcsTopicId,
        sequenceNumber: `${sequenceNumber}`,
      };

      await SEND_PROJECT_NOTES(body);
      setRefetchData(true);
      setNotepopup(false);
      showToast("Note Sent", "success");
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetChatList() {
    try {
      setDropdownLoad(true);
      let objparam = {
        projectId: projectDetails?.id,
        userId: formik.values.toId,
      };
      let param = "?" + new URLSearchParams(objparam).toString();
      let res = await PROJECT_CHAT_LIST(param);
      setMilestonesData(res?.data?.Milestones);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setDropdownLoad(false);
    }
  }

  async function handleGetProject() {
    try {
      setIsLoading(true);
      let Objparam = {
        filterBy: "ASSIGNED",
        sortBy: "asc"
      };
      let param = "?" + new URLSearchParams(Objparam).toString();
      let res = await GET_PROJECT(param);
      let filterData = res?.data && res?.data?.allProjects && res?.data?.allProjects.filter((prj: any) => prj?.hcsTopicId !== null)
        .map((prj: any) => ({ id: prj.id, title: prj?.title, hcsTopicId: prj?.hcsTopicId }))
      setProject(filterData);
      setProjectDetails(filterData[0]);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetProjectNotes(id: any) {
    try {
      setIsLoading(true);
      let res = await GET_PROJECT_NOTES(id);
      setProjectNotes(res?.data?.notes);
      setMembers(res?.data?.members);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetProject();
  }, []);

  useEffect(() => {
    function handleSerach(query: any) {
      let resultData: any = {};
      Object.keys(projectsNotes).forEach((category) => {
        let findsearchData = projectsNotes[category].filter(
          (note: any) =>
            note.From.name.toLowerCase().includes(query.toLowerCase()) ||
            note.To.name.toLowerCase().includes(query.toLowerCase()) ||
            note.message.toLowerCase().includes(query.toLowerCase())
        );
        if (findsearchData.length > 0) {
          resultData[category] = findsearchData;
        }
      });
      setProjectNotes(resultData);
    }
    let debouncedFunction = _debounce(handleSerach, 1000);

    if (searchval) {
      debouncedFunction(searchval);
    } else {
      if (projectDetails?.id) {
        handleGetProjectNotes(projectDetails?.id);
        formik.setFieldValue("toName", "");
        formik.setFieldValue("milestoneName", "");
      }
    }
    return () => {
      debouncedFunction.cancel();
    };
  }, [searchval]);

  useEffect(() => {
    if (refetchData || projectDetails?.id) {
      handleGetProjectNotes(projectDetails?.id);
      formik.setFieldValue("toName", "");
      formik.setFieldValue("milestoneName", "");
      setRefetchData(false);
    }
  }, [projectDetails, refetchData]);

  useEffect(() => {
    if (formik.values.toId) {
      handleGetChatList();
    }
  }, [formik.values.toId]);
  return (
    <>
      {sendNote && (
        <SendNotePopUp
          open={sendNote}
          close={CloseSend}
          members={members}
          formik={formik}
          isLoading={isLoading}
          dropdownload={dropdownload}
          milestonesData={milestonesData}
        />
      )}
      <Structure
        Heading={"Notes Inbox"}
        TopButton={
          <>
            <div className="w-[100px]">
              <Button
                label="Send Note"
                size="small"
                onClick={OpenSend}
                disable={isLoading}
              />
            </div>
          </>
        }
        mainSection={
          <NoteHistory
            project={project}
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            projectsNotes={projectsNotes}
            isLoading={isLoading}
            userDetails={user}
            note={replyNotes}
            setReplyNotes={setReplyNotes}
            notepopup={notepopup}
            setNotepopup={setNotepopup}
            formik={formik}
            searchval={searchval}
            setSearchVal={setSearchVal}
          />
        }
        border={false}
      />
    </>
  );
};

export default Index;
