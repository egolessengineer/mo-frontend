import { useFormik } from 'formik';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import {
  Button,
  HelperText,
  Logo,
  Textfield,
  Typography,
} from "../../../Components/Atoms";
import { handleCustomError, showToast } from "../../../Utils/helper";
import { SEND_RESET_PASSWORD } from "../../../sevices";


const Forget = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const {handleBlur, handleChange, handleSubmit, values, touched, errors, setFieldValue, setFieldError, setErrors} = useFormik({
    initialValues:{
      email : "",
    },
    validationSchema : yup.object({
      email: yup.string()
      .email()
      .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"email not correct")
      .required("Email is Required")
    }),
    onSubmit: ()=>{
      handleSendToPasswordEmail()
    }
  })

  async function handleSendToPasswordEmail(){
    
    try{     
      setIsLoading(true); 
      await SEND_RESET_PASSWORD({email:values.email})
      showToast("Check your Email", "success");
      navigate("/verify", { state: { email: values.email } });     
    }
    catch(error:any){
      handleCustomError(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Logo position="start" />
      <div className="flex flex-col justify-between h-calc">
        <div className="flex flex-col items-center ">
          <div className="mt-[8px]">
            <Typography
              type="h1"
              label="Reset Password"
              FontSize="4xl"
              color="primary"
              variant={200}
            />
          </div>

          <div className="pt-[200px]">
            <Typography
              label="Enter register email id"
              FontSize="xl"
              color="primary"
              variant={200}
              type="h2"
            />
          </div>
          <form onSubmit={handleSubmit} className="mt-[22px] w-[332px] ">
            <Typography
              label="Email Id"
              type="p"
              color="primary"
              variant={200}
              FontSize="sm"
              classname=" font-bold "
            />

            <Textfield
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeHolder="Enter email id"
            />

            <div className="flex justify-end">
              <div className="">
                {touched.email && errors.email ? (
                  <HelperText
                    label={errors.email}
                    color="danger"
                    icon={
                      <img
                        src="/Assets/Danger.svg"
                        alt="error"
                        className="pt-[8px]"
                      ></img>
                    }
                    className="text-xxs"
                  />
                ) : null}

                <div className="mt-[30px] ">
                  {/* <Link to="/verification"> */}
                  <Button
                    onClick={handleSubmit}
                    disable={isLoading}
                    type="submit"
                    label="Continue"
                    color="primary"
                    variant="standard"
                    size="small"
                  />
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex  p-5 justify-start">
          <div className="w-[100px]">
            <Link to={"/signin"}>
              <Button
                label="Back"
                color="secondary"
                variant="Transparent"
                size="small"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;
