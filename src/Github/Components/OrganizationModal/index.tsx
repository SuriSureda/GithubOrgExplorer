import { useEffect, useState } from 'react';
import { Modal, ModalProps } from '../../../Shared/Components/Modal';
import { Organization } from '../../Domain/Organization';
import './index.css';
import { OrganizationReposList } from '../OrganizationReposList';

type Props = {
  organization?: Organization;
  onClose: () => void;
};

export const OrganizationModal: React.FC<Props> = ({ organization, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(Boolean(organization));
  }, [organization]);

  const modalProps: ModalProps = {
    showModal: showModal,
    onClose: () => {
      onClose();
    },
  };

  return (
    <Modal {...modalProps}>
      <div className='organization-modal'>
        <a title='Go to Organization page' className='organization-modal-link' href={organization?.html_url} target='_blank' rel='noreferrer'>
          <div className='organization-modal-header'>
            <img className='organization-modal-avatar' src={organization?.avatar_url} alt='organization modal avatar' />
            <h2 className='organization-modal-name'> {organization?.login}</h2>
          </div>
        </a>
        <OrganizationReposList organization={organization} />
      </div>
    </Modal>
  );
};
