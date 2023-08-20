import React,{useState} from 'react';
import Box from '@mui/material/Box';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={props.editOpen}
        onClose={()=>props.setEditOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Formik
					initialValues={{
						fullName: "",
						phoneNumber: "",
						password: "",
					}}
					onSubmit={(values) => {
						// same shape as initial values
					
					}}
				>
					{({ errors, touched }) => (
						<Form className="w-full flex flex-col justify-center mx-auto mt-10">
						
							<label
								htmlFor="fullName"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Full Name
							</label>
							<Field
								className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
								name="fullName"
							/>
							{errors.fullName && touched.fullName ? (
								<div className="text-red-500">{errors.fullName}</div>
							) : null}
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Phone Number
							</label>
							<Field
								className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
								name="phoneNumber"
							/>
							{errors.phoneNumber && touched.phoneNumber ? (
								<div className="text-red-500">{errors.phoneNumber}</div>
							) : null}

							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Password
							</label>
							<Field
								name="password"
								type="password"
								className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
							/>
							{errors.password && touched.password ? (
								<div className="text-red-500">{errors.password}</div>
							) : null}
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Confirm Password
							</label>
							<Field
								name="confirmPassword"
								type="password"
								className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
							/>
							{errors.confirmPassword && touched.confirmPassword ? (
								<div className="text-red-500">{errors.confirmPassword}</div>
							) : null}

							<button
								type="submit"
								className="flex mt-3 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800"
							>
								Sign Up
							</button>
						</Form>
					)}
				</Formik>
        </Box>
      </Modal>
    </div>
  );
}