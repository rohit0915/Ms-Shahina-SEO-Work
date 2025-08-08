/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  edit_module_redux,
  getApi,
  getCart,
  post_module_redux,
} from "../../Repository/Api";
import SelectService from "../Sliders/SelectService";
import TextDrawer from "../Drawer/TextDrawer";
import { Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CartItems } from "../../store/cartSlice";
import Select from "react-select";
import { ViewDescription } from "../../Helper/Herlper";
import ContactComponent from "../Contact/ContactComponent";
import { IoMdNavigate } from "react-icons/io";
import FullScreenLoader from "../Loader/FullScreenLoader";
import { Dropdown } from "antd";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import endPoints from "../../Repository/apiConfig";

const Schedule1 = () => {
  const [response, setResponse] = useState({});
  const [Item, setItem] = useState([]);
  const [id, setId] = useState("All");
  const [cart, setCart] = useState({});
  const [adOnService, setAdOnService] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [ServiceResponse, setServiceResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [text, setText] = useState("");
  const [metaResponse, setMetaResponse] = useState(null);
  const myCart = useSelector(CartItems);
  const dispatchFunc = [getCart];

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.scheduleAppointmentPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    setCart(myCart);
  }, [myCart]);

  const GetItems = useCallback(() => {
    let url;
    if (id === "All") {
      url = "api/v1/Service/all/getAllServices";
    } else if (id === "Limited") {
      url = "api/v1/Service/getOnSaleByToken/Service";
    } else {
      url = `api/v1/Service/all/paginateServiceSearchforWebsite?categoryId=${id}`;
    }
    getApi({
      url,
      setResponse: setServiceResponse,
    });
  }, [id]);

  useEffect(() => {
    getApi({
      url: "api/v1/admin/Category/allCategory",
      setResponse,
    });
    getApi({
      url: "api/v1/admin/AddOnServices/allAddOnServices",
      setResponse: setAdOnService,
    });
    fetchMetaTags();
  }, []);

  useEffect(() => {
    if (id) {
      GetItems();
    }
  }, [id, GetItems]);

  useEffect(() => {
    if (ServiceResponse) {
      if (id === "All") {
        if (ServiceResponse?.data?.length > 0) {
          setItem(ServiceResponse?.data);
        }
      } else if (id === "Limited") {
        if (ServiceResponse?.data?.length > 0) {
          setItem(ServiceResponse?.data);
        }
      } else {
        setItem(ServiceResponse?.data?.docs);
      }
    }
  }, [ServiceResponse, id]);

  const navigate = useNavigate();

  function BackNavigation() {
    navigate(-1);
  }

  const addServie = (id, i) => {
    let payload;
    if (i?.multipleSize === true) {
      const dataObj = selectedSizes[id];
      payload = {
        quantity: 1,
        priceId: dataObj?._id,
        size: dataObj?.size,
        sizePrice: dataObj?.price,
        memberprice: dataObj?.mPrice,
      };
    } else {
      payload = {
        quantity: 1,
      };
    }
    dispatch(
      post_module_redux({
        url: `api/v1/add-to-cart/service/${id}`,
        payload,
        dispatchFunc,
        setLoading,
      })
    );
  };

  const isItemInCart = ({ itemId, priceId, item }) => {
    if (item?.multipleSize === false) {
      return cart?.services?.some(
        (service) => service?.serviceId?._id === itemId
      );
    } else {
      return cart?.services?.some(
        (service) =>
          service?.serviceId?._id === itemId && service?.priceId === priceId
      );
    }
  };

  const deleteServiceItem = (id, priceId) => {
    if (priceId) {
      dispatch(
        edit_module_redux({
          url: `api/cart/delete/service/${id}`,
          payload: {
            priceId,
          },
          dispatchFunc,
          setLoading,
        })
      );
    } else {
      dispatch(
        edit_module_redux({
          url: `api/cart/delete/service/${id}`,
          payload: {},
          setLoading,
          dispatchFunc,
        })
      );
    }
  };

  const addOnInCart = (id) => {
    dispatch(
      post_module_redux({
        url: `api/v1/add-to-cart/addOnservices/${id}`,
        payload: {
          quantity: 1,
        },
        dispatchFunc,
        setLoading,
      })
    );
  };

  const deleteAnother = (id) => {
    dispatch(
      edit_module_redux({
        url: `api/cart/delete/addOnservices/${id}`,
        payload: {},
        setLoading,
        dispatchFunc,
      })
    );
  };

  function textTransform(content, title) {
    if (content?.length > 150) {
      return (
        <>
          <ViewDescription description={content?.substr(0, 150)} />
          <p className="desc"> </p>
          <button
            className="view_more"
            onClick={() => {
              setTitle(title);
              setDesc(content);
              setModalOpen(true);
            }}
          >
            View More
          </button>
        </>
      );
    } else {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
  }

  let bookNow;
  if (cart?.services?.length === 0 || !cart || !cart?.services) {
    const Component = () => {
      return (
        <>
          <button className="book" onClick={() => setErr(true)}>
            BOOK NOW
          </button>
          {err && (
            <p
              style={{
                textAlign: "center",
                color: "#042b26",
                marginTop: "10px",
              }}
            >
              Please Select Service first !
            </p>
          )}
        </>
      );
    };
    bookNow = <Component />;
  } else {
    const Component = () => {
      return (
        <button className="book" onClick={() => navigate("/schedule2")}>
          BOOK NOW
        </button>
      );
    };
    bookNow = <Component />;
  }

  const isInCart = (itemId) => {
    return cart?.AddOnservicesSchema?.some(
      (service) => service?.addOnservicesId?._id === itemId
    );
  };

  function AdOnHandler(id) {
    if (isInCart(id)) {
      deleteAnother(id);
    } else {
      addOnInCart(id);
    }
  }

  // ----------------

  // Normal Service --
  function RegularHandler(id, priceId, i) {
    if (isItemInCart({ itemId: id, priceId, item: i })) {
      deleteServiceItem(id, priceId);
    } else {
      addServie(id, i);
    }
  }
  // ----

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [cart]);

  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (selectedOption, productId) => {
    const parsedValue = JSON.parse(selectedOption.value);
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: parsedValue,
    }));
  };

  const hasService = cart && cart?.services?.length > 0;

  function TimeFetcher(i) {
    if (i.multipleSize === true) {
      if (selectedSizes[i._id]?.totalTime) {
        return <p> Total Time : {selectedSizes[i._id]?.totalTime}</p>;
      }
    } else {
      <p>Total Time : {i?.totalTime}</p>;
    }
  }

  function packageGetter(i) {
    if (i?.multipleSize === true) {
      return (
        <Select
          options={i.sizePrice?.map((i) => ({
            value: `${JSON.stringify(i)}`,
            label: `${i.size} ${
              i?.savedPrice > 0 ? `- $${i?.savedPrice}/session` : ""
            } `,
          }))}
          onChange={(selectedOption) => handleSizeChange(selectedOption, i._id)}
          placeholder="Select type"
          className="mt-2 mb-2"
        />
      );
    }
  }

  function priceGetter(i) {
    if (i?.type === "offer") {
      return `$${i?.discountPrice}`;
    } else {
      if (i.multipleSize === true) {
        if (selectedSizes[i._id]?.price) {
          return `$${selectedSizes[i._id]?.price}`;
        }
      } else {
        return `$${i.price}`;
      }
    }
  }

  function checkboxGetter(i) {
    const priceId = selectedSizes[i._id]?._id;
    if (i?.multipleSize === true) {
      if (
        selectedSizes[i._id] ||
        isItemInCart({ itemId: i._id, priceId, item: i })
      ) {
        return (
          <input
            type="checkbox"
            checked={isItemInCart({ itemId: i._id, priceId, item: i })}
            onClick={() => {
              RegularHandler(i._id, priceId, i);
            }}
            className="checkbox_ cursor-pointer"
          />
        );
      } else {
        return (
          <input
            type="checkbox"
            disabled
            className="checkbox_ cursor-pointer"
          />
        );
      }
    } else {
      return (
        <input
          type="checkbox"
          checked={isItemInCart({ itemId: i._id, item: i })}
          onClick={() => {
            const priceId = selectedSizes[i._id]?._id;
            RegularHandler(i._id, priceId, i);
          }}
          className="checkbox_ cursor-pointer"
        />
      );
    }
  }

  //
  const items =
    response?.data?.length > 0
      ? [
          {
            label: (
              <p
                className={"All" === id ? "active" : ""}
                onClick={() => {
                  setText("All");
                  setId("All");
                }}
              >
                All
              </p>
            ),
            key: "0",
          },
          {
            label: (
              <p
                className={"Limited" === id ? "active" : ""}
                onClick={() => {
                  setText("Limited Time Offers");
                  setId("Limited");
                }}
              >
                Limited Time Offers
              </p>
            ),
            key: "1",
          },
          ...response?.data?.map((i) => ({
            label: (
              <p
                className={id === i._id ? "active" : ""}
                onClick={() => {
                  setText(i.name);
                  setId(i._id);
                }}
              >
                {i.name}
              </p>
            ),
            key: i._id,
          })),
        ]
      : [];

  return (
    <>
      <TextDrawer
        open={modalOpen}
        setOpen={setModalOpen}
        title={title}
        desc={desc}
      />
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}

      {loading && <FullScreenLoader />}
      <div className="down_arrow_btn">
        <a href="#booknow">
          <IoMdNavigate color="#fff" />
        </a>
      </div>

      <div className="Backward_Heading step_Heading">
        <div>
          <ImageLazyLoading
            img={"/Image/1.png"}
            alt={"Go Back"}
            onClick={() => BackNavigation()}
            className={"text-[10px]"}
          />
          <p style={{ width: "50%" }}>STEP 1 OF 3</p>
        </div>
        <p className="title">Select Services</p>
      </div>

      <div className="schedule_1">
        <div className="left_div">
          {isMobile ? (
            <div className="antd-my-dropdown">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <button className="book-online">
                  {text ? text : "All Services"}{" "}
                  <i className="fa-solid fa-caret-down"></i>
                </button>
              </Dropdown>
            </div>
          ) : (
            <SelectService data={response} id={id} setId={setId} />
          )}

          {hasService && (
            <>
              <p className="title">Selected Services</p>
              <div className="Box">
                {cart?.services?.map((i, index) => (
                  <div className="Item" key={index}>
                    <div>
                      <input
                        type="checkbox"
                        checked
                        className="cursor-pointer"
                        onClick={() =>
                          RegularHandler(
                            i?.serviceId?._id,
                            i?.priceId,
                            i?.serviceId
                          )
                        }
                      />
                    </div>

                    <div className="description-box">
                      <p className="title">
                        {" "}
                        {i?.priceId ? i?.size : i?.serviceId?.name}{" "}
                      </p>

                      <p className="desc">
                        Total Time : {i?.totalTime}
                        {textTransform(
                          i?.serviceId?.description,
                          i?.serviceId?.priceId
                        )}
                      </p>
                    </div>
                    <div className="price-Box">
                      <p className="title">${i.total}</p>
                    </div>
                  </div>
                ))}
                {cart?.AddOnservicesSchema?.map((i, index) => (
                  <div className="Item" key={index}>
                    <div>
                      <input
                        type="checkbox"
                        checked
                        onClick={() => deleteAnother(i?.addOnservicesId?._id)}
                      />
                    </div>

                    <div className="description-box">
                      <p className="title"> {i?.addOnservicesId?.name} </p>
                      <p className="desc">
                        Total Time : {i?.addOnservicesId?.totalTime}
                        {i?.addOnservicesId?.description}
                      </p>
                    </div>
                    <div className="price-Box">
                      <p className="title"> ${i.addOnservicesId?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="title">Featured Services</p>
          <div className="Box">
            {" "}
            {!Item ? (
              <Alert
                message={`No Service is Related to ${text}`}
                type="info"
                className="Alert"
              />
            ) : (
              Item?.map((i, index) => (
                <div className="Item" key={index}>
                  {checkboxGetter(i)}
                  <div className="description-box">
                    <p className="title"> {i.name} </p>
                    {TimeFetcher(i)}
                    {packageGetter(i)}
                    {textTransform(i.description, i.name)}
                  </div>
                  <div className="price-Box">
                    <p className="title">{priceGetter(i)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="right_div">
          <div className="Box" id="booknow">
            <ContactComponent />
            {/* Service */}
            {cart?.services?.map((i, index) => (
              <div className="Items" key={index}>
                <div className="two-div">
                  <p className="head">
                    {" "}
                    {i?.priceId ? i?.size : i?.serviceId?.name}{" "}
                  </p>
                  <p className="head"> ${i?.total}</p>
                </div>
                <div className="two-div">
                  <p className="desc"> Total Time : {i?.totalTime}</p>
                  <p
                    className="delete cursor-pointer"
                    onClick={() =>
                      deleteServiceItem(i.serviceId?._id, i?.priceId)
                    }
                  >
                    {" "}
                    DELETE
                  </p>
                </div>
              </div>
            ))}

            {/* Ad on Service */}
            {cart?.AddOnservicesSchema?.map((i, index) => (
              <div className="Items" key={index}>
                <div className="two-div">
                  <p className="head"> {i?.addOnservicesId?.name} </p>
                  <p className="head"> ${i.addOnservicesId?.price}</p>
                </div>
                <div className="two-div">
                  <p className="desc">
                    {" "}
                    Total Time : {i?.addOnservicesId?.totalTime}
                  </p>
                  <p
                    className="delete cursor-pointer"
                    onClick={() => deleteAnother(i?.addOnservicesId?._id)}
                  >
                    {" "}
                    DELETE
                  </p>
                </div>
              </div>
            ))}

            {bookNow}
          </div>

          {adOnService?.data?.length > 0 && (
            <>
              <div className="border-collapsed"></div>

              <div className="Box">
                <p style={{ fontWeight: "bold", fontSize: "22px" }}>
                  Add On Services
                </p>
                {adOnService?.data?.map((i, index) => (
                  <div className="add-on" key={index}>
                    <input
                      type="checkbox"
                      checked={isInCart(i._id)}
                      onClick={() => AdOnHandler(i._id)}
                    />
                    <div className="left" style={{ textAlign: "right" }}>
                      <div className="head">
                        <p className="title"> {i.name} </p>
                        <p className="price">${i.price} </p>
                      </div>
                      <p className="desc"> {i.time} </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Schedule1;
