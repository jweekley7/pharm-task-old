import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import './modal.scss'
import { ReactNode } from 'react';

type ModalWrapperType = {
  children: ReactNode;
  title: string;
  backEnabled: boolean;
  closeOnTapOutside: boolean;
  onCloseClicked?: () => void;
  onBackClicked?: () => void;
};

const ModalWrapper = ({
  children,
  title,
  backEnabled,
  closeOnTapOutside,
  onCloseClicked,
  onBackClicked,
}: ModalWrapperType) => {
  return (
    <div
      className="db-modal-backdrop"
      onClick={() => {
        if (closeOnTapOutside && onCloseClicked) onCloseClicked();
      }}
    >
      <div className="db-modal-content">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center justify-start">
            {backEnabled && (
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="mr-3 text-xl cursor-pointer"
                onClick={() => {
                  if (onBackClicked) onBackClicked();
                }}
              />
            )}
            <div className="text-lg">{title}</div>
          </div>
          {!backEnabled && (
            <FontAwesomeIcon
                icon={faClose}
                className="mr-3 text-xl cursor-pointer"
                onClick={() => {
                  if (onCloseClicked) onCloseClicked();
                }}
              />
          )}
        </div>
        <hr className='w-full pb-2'></hr>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;