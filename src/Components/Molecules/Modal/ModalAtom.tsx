import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
interface RequiredDetailsModal {
  Title: any;
  description: any;
  open: any;
  positionDiv?: any;
  PanelPosition?: any;
  changeState?: any;
  close?: any;
}

export const ModalAtom = ({
  Title,
  description,
  open,
  positionDiv = "flex min-h-full items-center justify-center p-4",
  PanelPosition = "w-full items-center h-full ",
  changeState,
  close,
}: RequiredDetailsModal) => {
  const [isopen, setisopen] = useState(open);

  return (
    <>
      <Transition appear show={isopen}>
        <Dialog
          as="div"
          className="z-10"
          open={isopen}
          onClose={() => {
            changeState && changeState();
            close && close();

            setisopen(false);
          }}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="absolute inset-0 overflow-y-auto">
            <div className={positionDiv}>
              <Dialog.Panel
                className={`shadow-navbar rounded-[5px] bg-white  ${PanelPosition} z-50 w-[80%] `}
              >
                <Dialog.Title as="div">{Title}</Dialog.Title>
                {description}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
