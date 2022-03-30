// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   createProduct,
//   getProduct
// } from "../../apiServices/index";
// import { toast } from "react-toastify";
// import { ErrorMessage } from "@hookform/error-message";
// import ErrorMessageCustom from "../../components/errorMessage";
// import InputField from "../../components/inputField";
// import Modal from "../../components/modal";
// import './form.css';

// const productFormValidationSchema = yup.object({
//   name: yup.string().required("Name of Product must be filled").max(20),
//   description: yup.string().required("Description must be filled").max(200),
//   quantity: yup.number().required("Quantity must be filled").min(10, "Phone number must be 10 characters!")
// });

// function FormCreate() {

//   const [editProduct, setEditProduct] = useState({});
//   const [open, setOpen] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     setError,
//     getValues,
//     reset,
//   } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(productFormValidationSchema),
//   });


//   useEffect(() => {
//     register("name");
//     register("description");
//     register("quantity");
//   }, [register]);


//   const onChange = (e) => {
//     setValue(e.target.name, e.target.value);
//     setError(e.target.value, null);
//   };

//   const onSubmit = async(formdata) =>{
//       const {status, data} = await createProduct(formdata);
//       return {data, status};

//   }

//   return (
//     <div className="container">
//       <form class="login">

//         <label class="block text-gray-700 text-sm font-bold mb-2">
//           Name of Category
//         </label>
//         <InputField
//           type="text"
//           placeholder="Please Type Name of Product"
//           name="name"
//           value={getValues("name")}
//           onChange={onChange}
//         />
//         <label class="block text-gray-700 text-sm font-bold mb-2">
//           Description of Category
//         </label>
//         <InputField
//           type="text"
//           placeholder="Please Type Description of Product"
//           name="description"
//           value={getValues("description")}
//           onChange={onChange}
//         />
//         <label class="block text-gray-700 text-sm font-bold mb-2">
//           Quantity of Category
//         </label>
//         <InputField
//           type="text"
//           placeholder="Please Type Quantity of Product"
//           name="quantity"
//           value={getValues("quantity")}
//           onChange={onChange}
//         />
//         <button
//           type="submit"
//         >
//           Create
//         </button>
//       </form>
//     </div>

//   )
// }

// export default FormCreate