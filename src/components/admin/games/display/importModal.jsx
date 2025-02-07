import { Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure, 
  Button
} from "@heroui/react";

export default function ImportModal({isOpen, onOpen, onOpenChange}){

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
      <ModalContent>
        {
          (onClose) => (
            <>
              <ModalHeader>
                Import Game
              </ModalHeader>
              <ModalBody>

              </ModalBody>
              <ModalFooter>
                <Button>Cancel</Button>
                <Button>Import</Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>


    </Modal>
  )

}