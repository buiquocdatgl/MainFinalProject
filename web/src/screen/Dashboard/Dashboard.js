import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getOrder
} from "../../apiServices/index";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import ErrorMessageCustom from "../../components/errorMessage";
import InputField from "../../components/inputField";
import Modal from "../../components/modal";
import Form from "../../components/form";
import SideBar from "./Sidebar/index";
import OrderReport from "./OrderReport/OrderReport";
import Button from "../../components/button";
import MostOrder from "./MostOrder/MostOrder";
import MostTypeOfOrder from "./MostTypeOfOrder/MostTypeOfOrder";
import {
  PencilAltIcon,
  BackspaceIcon,
  XCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";

const productFormValidationSchema = yup.object({
  name: yup.string().required("Name of Product must be filled").max(20),
  description: yup.string().required("Description must be filled").max(200),
  quantity: yup.number().required("Quantity must be filled"),
});

function Dashboard() {
  const [products, setProducts] = useState();
  const [order, setOrder] = useState({});
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [active, setActive] = useState(1);
  const [editProduct, setEditProduct] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productDelete, setProductDelete] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(productFormValidationSchema),
  });

  useEffect(() => {
    register("name");
    register("description");
    register("quantity");
  }, [register]);

  const fetchData = async () => {

    const { data, status } = await getProduct();
    const orderInDB = await getOrder();
    if (orderInDB.data.length > 0) {
      const newItem = data.map(item =>{
        const newBody = {
          id: item.id,
          name: item.name,
          description: item.description,
          imageLink: item.imageLink,
          quantity: item.quantity - 1
        }
        return newBody
      })
      Promise.all(newItem);
      setProducts((prev) => newItem); 
    }
    else{
      setProducts((prev) => data); 
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
      
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])


  const onSubmit = async (formdata) => {
    const submitFormData = new FormData();
    submitFormData.append("image", image.data);
    submitFormData.append("name", formdata.name);
    submitFormData.append("description", formdata.description);
    submitFormData.append("quantity", formdata.quantity);
    const { status, data } = await createProduct(submitFormData);
    if (status === 200) {
      toast.success("Create success");
      setProducts((prev) => [...prev, data]);
      setImage({ preview: "", data: "" });
      reset({ name: "", description: "", quantity: "" });
      fetchData();
      setOpen((prev) => !prev);
    } else {
      toast.error(data.message);
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleChecked = (index) => {
    setActive(index);
  };

  const update = async (e) => {
    e.preventDefault();
    const { data, status } = await updateProduct(editProduct.id, editProduct);

    if (status === 200) {
      toast.success(data.message);
      setEditProduct((prev) => data);
      fetchData();
      setEditOpen((prev) => !prev);
    }
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    const getSingleCategory = async () => {
      const { data, status } = await getSingleProduct(id);
      if (status === 200) {
        setEditProduct((prev) => data);
      }
    };
    getSingleCategory();
    setEditOpen((prev) => !prev);
  };

  const onEditChange = (e) => {
    setEditProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const deletProduct = async (event) => {
    event.preventDefault();
    const { data, status } = await deleteProduct(productDelete.id);
    if (status === 200) {
      toast.success(data.message);
      fetchData();
      setDeleteOpen((prev) => !prev);
    }
    if (status === 400) {
      toast.error(data.message);
    }
  };

  const handleDelete = async (e, item) => {
    e.preventDefault();
    //check item co ton tai idea ko
    setDeleteOpen((prev) => !prev);

    setProductDelete(item);
  };

  return (
    <div className="flex w-full min-h-screen font-sans bg-gray-800">
      <SideBar active={active} handleChecked={handleChecked} />
      <main className="flex flex-col flex-1 gap-6 p-4">
        <header className="h-20 items-center relative z-10">
          <div className="flex flex-center flex-col h-full justify-center mx-auto relative px-3 text-white z-10">
            <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
              <div className="flex group h-full items-center relative w-12">
                <button
                  type="button"
                  aria-expanded="false"
                  aria-label="Toggle sidenav"
                  className="text-4xl text-white focus:outline-none"
                >
                  &#8801;
                </button>
              </div>
              <div className="container flex left-0 relative w-3/4">
                <div className="group hidden items-center ml-8 relative w-full md:flex lg:w-72">
                  <div className="absolute block cursor-pointer flex items-center justify-center h-10 p-3 pr-2 text-gray-500 text-sm uppercase w-auto sm:hidden">
                    <svg
                      fill="none"
                      className="h-5 relative w-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <svg
                    className="absolute fill-current h-4 hidden left-0 ml-4 pointer-events-none text-gray-500 w-4 group-hover:text-gray-400 sm:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                  </svg>
                  <input
                    type="text"
                    className="bg-gray-800 block leading-normal pl-10 py-1.5 pr-4 ring-opacity-90 rounded-2xl text-gray-400 w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
                <a href="#" className="block pr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </a>
                <button className="block pr-5" onClick={() => setOpen(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <a href="#" className="block pr-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </a>
                <button className="block relative">
                  <img
                    alt="Maurice Lokumba"
                    src="/img/avatar.jpg"
                    className="h-10 mx-auto object-cover rounded-full w-10"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>
        <hr className="border-gray-700" />
        <div className="flex gap-6">
          {products?.length &&
            products?.map((item) => (
              <div
                className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3"
                key={item.id}
              >
                <div className="flex items-center gap-x-3">
                  <div className="flex gap-x-4 items-center">
                    <img
                      className="w-14 h-14"
                      src={`http://localhost:12000${item.imageLink}`}
                      alt=""
                    />
                    <div className="flex flex-col gap-y-0.5">
                      <div className="text-3xl font-medium text-white">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 ml-2">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <button
                    className="block pr-5 text-white"
                    onClick={(e) => editHandler(e, item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center">
                  <div>
                    <div className="text-sm tracking-wide text-gray-500">
                      Total of {item.name}
                    </div>
                    <div className="text-3xl font-semibold text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button
                      icon={XCircleIcon}
                      type="danger"
                      title="Delete"
                      onClick={async (e) => handleDelete(e, item)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <OrderReport />
      </main>
      <aside className="flex flex-col gap-y-6 pt-6 pr-6 w-96">
        <MostOrder />
        <MostTypeOfOrder />
      </aside>

      <Modal open={editOpen} setOpen={setEditOpen}>
        <div className="w-screen sm:max-w-lg">
          <Form title="update Product">
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-auto">
              Description of Product
            </label>
            <InputField
              type="text"
              placeholder="Description"
              name="description"
              value={editProduct?.description}
              onChange={onEditChange}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-auto">
              Quantity of Product
            </label>
            <InputField
              type="text"
              placeholder="Quantity"
              name="quantity"
              value={editProduct?.quantity}
              onChange={onEditChange}
            />

            <div className="w-3/5 flex flex-wrap justify-between items-center">
              <Button
                onClick={update}
                role="submit"
                icon={PencilAltIcon}
                type="primary"
                title="Update"
              />
              <Button
                icon={XCircleIcon}
                type="danger"
                title="Cancel"
                onClick={editHandler}
              />
            </div>
          </Form>
        </div>
      </Modal>

      <Modal open={open} setOpen={setOpen}>
        <div className="w-screen sm:max-w-lg">
          <Form title="Create Product">
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-auto">
              Name of Product
            </label>
            <InputField
              type="text"
              placeholder="Please Type Name of Product"
              name="name"
              {...register("name")}
            />
            <ErrorMessage
              name="name"
              errors={errors}
              render={({ message }) => <ErrorMessageCustom message={message} />}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-auto">
              Description of Product
            </label>
            <InputField
              type="text"
              placeholder="Please Type Description of Product"
              name="description"
              {...register("description")}
            />
            <ErrorMessage
              name="description"
              errors={errors}
              render={({ message }) => <ErrorMessageCustom message={message} />}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-auto">
              Quantity of Product
            </label>
            <InputField
              type="text"
              placeholder="Please Type Quantity of Product"
              name="quantity"
              {...register("quantity")}
            />
            <ErrorMessage
              name="image"
              errors={errors}
              render={({ message }) => <ErrorMessageCustom message={message} />}
            />
            <InputField
              type="file"
              className="bg-zinc-700 hover:bg-blue-600 text-white flex gap-1 sm:gap-2 items-center h-fit rounded-md font-semibold px-[40px] py-[10px] sm:px-12 sm:py-3 w-fit"
              onChange={handleFileChange}
            />

            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 flex gap-1 sm:gap-2 items-center h-fit rounded-md font-semibold px-[100px] py-[10px] sm:px-30 sm:py-3 w-fit"
              onClick={handleSubmit(onSubmit)}
            >
              Create
            </button>
          </Form>
        </div>
      </Modal>

      <Modal open={deleteOpen} setOpen={setDeleteOpen}>
        <div className="w-screen sm:max-w-lg">
          <Form title="Delete Category">
            <div className="w-3/5 flex flex-wrap justify-between items-center">
              <h4
                style={{
                  color: "red",
                  fontSize: "17px",
                  paddingBottom: "10px",
                }}
              >
                Are you sure you want to delete ?
              </h4>

              <Button
                onClick={deletProduct}
                role="submit"
                icon={BackspaceIcon}
                type="danger"
                title="Delete"
              />
              <Button
                icon={XCircleIcon}
                type="primary"
                title="Cancel"
                onClick={handleDelete}
              />
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
