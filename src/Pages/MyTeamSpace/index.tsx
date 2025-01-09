import { useEffect, useState } from "react";
import MainSection from "./MainSection";

import { useFormik } from "formik";
import _debounce from "lodash/debounce";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { Button, Textfield } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { Structure } from "../../Components/Molecules";
import { AuthState } from "../../Context/auth";
import { handleCustomError, showToast } from "../../Utils/helper";
import { CREATE_TEAM, GET_TEAM, INVITE } from "../../sevices";
import AddProviderPop from "./AddProviderPop";

const MyTeamSpace = () => {
  const [OpenTeam, setOpenTeam] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<any>();
  const [serachval, setSerachVal] = useState("");
  const { user, setUser } = AuthState();
  const [refetch, setrefetch] = useState(false);
  const navigate = useNavigate();
  const OpenCreateNewTeam = () => {
    setOpenTeam((prev) => !prev);
  };
  const CloseCreateTeam = () => {
    setOpenTeam(false);
  };

  const emailformik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is Required"),
    }),
    onSubmit: (val, { resetForm }) => {
      handleInviteThroughEmail();
      resetForm();
    },
  });

  async function handleInviteThroughEmail() {
    try {
      setIsLoading(true);
      let body = {
        email: emailformik.values.email,
      };
      let res = await INVITE(body);
      showToast("Sent Successfully", "success");
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

  let initialValues = {
    teamName: "",
    provideMembers: [],
  };

  let formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      teamName: Yup.string().required("Team name is Required"),
      provideMembers: Yup.array().test(
        "array-required",
        "Provide members is Required",
        function (value) {
          return value && value.length > 0;
        }
      ),
    }),
    onSubmit: (value, { resetForm }) => {
      handleCreateTeam();
      resetForm();
    },
  });

  async function handleCreateTeam() {
    try {
      setIsLoading(true);
      let body = {
        name: formik.values.teamName,
        members: formik.values.provideMembers.map((item: any) => item?.id),
      };
      await CREATE_TEAM(body);
      showToast("Team Created", "success");
      setrefetch(true);
      setOpenTeam(false);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetTeam() {
    try {
      setIsLoading(true);
      let { data } = await GET_TEAM();
      setTeams(data);
    } catch (error: any) {
      handleCustomError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    function handleSerach(query: any) {
      const results = teams?.filter(
        (team: any) =>
          team.name.toLowerCase().includes(query.toLowerCase()) ||
          team.TeamMembers.some((member: any) =>
            member.User.name.toLowerCase().includes(query.toLowerCase())
          )
      );
      setTeams(results);
    }
    let debouncedFunction = _debounce(handleSerach, 1000);

    if (serachval) {
      debouncedFunction(serachval);
    } else {
      handleGetTeam();
    }
    return () => {
      debouncedFunction.cancel();
    };
  }, [serachval]);

  useEffect(() => {
    if (refetch) {
      handleGetTeam();
      setrefetch(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (user && user?.role !== "PROVIDER") {
      navigate("/");
    }
  }, [user?.role]);

  return (
    <>
      {OpenTeam && (
        <AddProviderPop
          open={OpenTeam}
          close={CloseCreateTeam}
          formik={formik}
          emailformik={emailformik}
          loader={isLoading}
        />
      )}
      <Structure
        mainSection={
          isLoading ? (
            <Loader />
          ) : (
            <MainSection teams={teams} setTeams={setTeams} />
          )
        }
        Heading={"My Team Space"}
        TopButton={
          <div className="w-[203px]">
            <Button
              size="small"
              label="Create New Team Space"
              onClick={OpenCreateNewTeam}
            />
          </div>
        }
        border={false}
        optionText={
          <>
            <div className="w-[350px]   ">
              <Textfield
                type="search"
                placeHolder="Search"
                onChange={(e: any) => {
                  setSerachVal(e.target.value);
                }}
                value={serachval}
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
          </>
        }
      />
    </>
  );
};

export default MyTeamSpace;
