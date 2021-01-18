import React from 'react';
import ReactDOM from 'react-dom';

import Card from 'domain/cards/Card';
import { Button, CloseButton } from 'components/ui-components/Button';
import { ModalContainer, ModalBackground, ModalContent,
     ModalHeader, ModalFooter } from './style';

const Modal = (props) => {
    return ReactDOM.createPortal(
        <ModalContainer modalVisibility={props.modalVisibility}>
        <ModalBackground/>
            <ModalContent>
                <ModalHeader>
                    <CloseButton onClick={props.hideModal}>
                    </CloseButton>
                </ModalHeader>
                <Card 
                    userId={props.userId}
                    organization={props.organization}
                />
                <ModalFooter>
                    <Button 
                        onClick={() => props.onStamp(
                        props.userId
                    )}>
                        Stamp 
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>   
    , document.querySelector('#modal')
    )
};

export default Modal;