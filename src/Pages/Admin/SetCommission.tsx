import { Dialog, Transition } from "@headlessui/react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { Fragment } from "react";
import * as Yup from "yup";
import { Button, HelperText, Textfield } from "../../Components/Atoms";
import { ButtonLoader } from "../../Components/Atoms/Loader";
const SetCommission = ({ open, close, data, changeCommission, isLoading }: any) => {
    const formik = useFormik({
        initialValues: {
            commission: data?.commission || 1
        },
        enableReinitialize: true,
        validationSchema:
            Yup.object({
                commission: Yup.number()
                    .typeError('Must be a number')
                    .positive('Must be a positive number')
                    .required("Commisson is required")
                    .moreThan(0, "Please enter more than 0")
                    .lessThan(100, "Please enter less than 100")
                    .test(
                        'maxDecimalDigits',
                        'Must have at most 2 decimal digits',
                        (value) => !value || /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString())
                    )
            }),
        onSubmit: (values) => {
            changeCommission(values)
        },
    });

    const handleDecimalNumberInputChange = (e: any, fieldName: string) => {
        const inputValue = e.target.value.replace(/[^0-9.]/g, ''); // Allow only digits and one decimal point
        formik.setFieldValue(fieldName, inputValue);
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <form onSubmit={formik.handleSubmit}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <BanknotesIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Commission
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <div>Current Commission: {data?.commission}</div>
                                                </div>
                                                <div className="w-[320px] md:w-[384px] ">
                                                    <Textfield
                                                        placeHolder="Define M.o. Commission"
                                                        name="commission"
                                                        onChange={(e: any) => handleDecimalNumberInputChange(e, "commission")}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.commission}
                                                        disable={isLoading}
                                                    />
                                                    {formik.touched.commission && formik.errors.commission && (
                                                        <HelperText
                                                            position="right"
                                                            label={formik.errors.commission as any}
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center gap-x-2 px-4 py-3 sm:px-6">
                                        <div className="w-[140px]">
                                            <Button
                                                variant="Transparent"
                                                color="secondary"
                                                onClick={close}
                                                label={
                                                    <div className="flex gap-x-2 items-center">
                                                        <div> Close</div>
                                                        {isLoading && <ButtonLoader />}
                                                    </div>
                                                }
                                                disable={isLoading}
                                                className="border-[1px] font-medium "
                                                size="small"
                                            />
                                        </div>
                                        <div className="w-[140px]">
                                            <Button
                                                type="submit"
                                                variant="standard"
                                                color="primary"
                                                label={
                                                    <div className="flex gap-x-2 items-center">
                                                        <div> Update</div>
                                                        {isLoading && <ButtonLoader className="border-white" />}
                                                    </div>
                                                }
                                                className="border-[1px] font-medium "
                                                size="small"
                                            />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </form>
            </Dialog>
        </Transition.Root >

    );
};

export default SetCommission;
