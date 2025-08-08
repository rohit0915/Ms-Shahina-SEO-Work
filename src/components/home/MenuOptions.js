/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";


const MenuOptions = () => {

  // Define the menu items with nested structure
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [services, setServices] = useState([]);
  const [load, setLoad] = useState(false);
  const isLoggedIn = useSelector(isAuthenticated);

  useEffect(() => {
    getApi({
      url: endPoints.service.getCategory,
      setResponse: setCategory,
      setLoading: setLoad,
    });
  }, []);

  const fetchService = useCallback(() => {
    // if (!categoryId) return; 

    const queryParams = new URLSearchParams({
      categoryId: categoryId,
    });

    const beforeLoginUrl = endPoints.service.getServiceByCategoryBeforeLogin(
      queryParams.toString()
    );
    const afterLoginUrl = endPoints.service.getServiceByCategoryAfterLogin(
      queryParams.toString()
    );
    const url = isLoggedIn ? beforeLoginUrl : beforeLoginUrl;

    getApi({
      url: url,
      setLoading: setLoad,
      setResponse: setServices,
    });
  }, [categoryId, isLoggedIn]);


  useEffect(() => {
    // if (categoryId) {
      fetchService();
    // }
  }, [fetchService]);



  // Function to get services by category ID
  const getServicesByCategoryId = (categoryId) => {
    return services?.data?.docs?.filter(service =>
      service.categoryId && service.categoryId._id === categoryId
    ) || [];
  };


  const generateMenuItems = () => {
    const categoryItems = category?.data?.map(category => {
      const categoryServices = getServicesByCategoryId(category._id);

      return {
        label:
          <Link
            to="/services/services"
          >
            {category.name}
          </Link>,
        key: category.name.toLowerCase().replace(/\s+/g, '-'),
        children: categoryServices.map((service, index) => ({
          label: (
            <Link
              to={{
                pathname: `/service/${service.slug}`,
              }}
            >
              {service.name}
            </Link>
          ),
          key: `${category.name.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
        })),
      };
    }) || [];

    // Add the "Limited Time Offers" item
    return [
      ...categoryItems,
      {
        label: <Link to="/limited-deals">Limited Time Offers</Link>,
        key: "limited-offers",
      },
    ];
  };



  const menuItems = generateMenuItems();


  // Create the menu using Ant Design's Menu component
  const servicesMenu = (
    <Menu className="services-menu">
      {menuItems.map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item key={child.key}>{child.label}</Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        )
      )}
    </Menu>
  );

  return (
    <header className="Nav_Menu_Container">
      <ul>
        <Link to="/">HOME</Link>
        <Link to="shop">SHOP</Link>
        <Dropdown
          overlay={servicesMenu}
          trigger={["click"]}
          className="antd_dropdown"
        >
          <li onClick={(e) => e.preventDefault()}>SERVICES</li>
        </Dropdown>
        <Link to="membership">MEMBERSHIP</Link>
        <Link to="gallery">GALLERY</Link>
        <a href="/paymentplan">PAYMENT PLANS</a>
        <Link to="contact">CONTACT</Link>
        <Link to="aboutus">ABOUT US</Link>
      </ul>
    </header>
  );
};

export default MenuOptions;