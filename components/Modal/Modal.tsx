"use client";

import { useRef, Fragment, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import Image from "next/image";
import {useModalStore} from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore';
import TaskGroup from '../TaskGroup/TaskGroup';
import { PhotoIcon } from "@heroicons/react/24/solid";

function Modal() {
  const  [image,setImage, newTask,setNewTask, newTaskType,addTask, cardComments, setCardComments]= useBoardStore((state)=>
  [ state.image,
    state.setImage,
    state.newTask,
    state.setNewTask,
    state.newTaskType,
    state.addTask,
    state.cardComments,
    state.setCardComments
    
  ])
  let [isOpen, closeModal] = useModalStore((state)=>
  [state.isOpen,
  state.closeModal]);
  const imagePicker = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTask) return;

    addTask(newTask, newTaskType, image, cardComments);
    setImage(image);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
      as="form"
      className="relative z-10"
      onSubmit={handleSubmit}
      onClose={closeModal}>
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4"></div>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
         <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Task
                </Dialog.Title>
              <div className='mt-2'>
                <input
                type="text"
                value={newTask}
                onChange={(e)=>setNewTask(e.target.value) }
                placeholder="Enter a task here....."
                className="w-full border border-gray-300 rounded-md outline-none p-5"

                />
              </div>
              {/* radio group */}
              <TaskGroup/>

              <div className='mt-2'>
                <input
                type="text"
                value={cardComments}
                onChange={(e)=>setCardComments(e.target.value) }
                placeholder="Enter comments here ....."
                className="w-full border border-gray-300 rounded-md outline-none p-5 mb-2"

                />
              </div>

                              {/* image */}
                              <div>
                  <button
                    type="button"
                    onClick={() => imagePicker.current?.click()}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block"></PhotoIcon>
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Uploaded image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      onClick={() => setImage(undefined)}
                    ></Image>
                  )}
                  <div></div>
                  <input
                    type="file"
                    ref={imagePicker}
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTask}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2
                  text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visile:ring-2 focus-visible:ring-blue-500 
                  focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed
                  "
                  >
                    Add Task
                  </button>
                </div>

                </Dialog.Panel>
        </Transition.Child>
        </div>
    </div>
      </Dialog>
    </Transition>

  )
}

export default Modal;