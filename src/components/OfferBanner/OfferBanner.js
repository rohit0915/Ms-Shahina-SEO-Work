/** @format */

import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import './offerBanner.css'
import img from '../../assest/Images/offerimage.webp'
import img1 from '../../assest/Images/playstore.png'
import img2 from '../../assest/Images/apple.png'

import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ImageLazyLoading } from "../../utils/helpingComponent";


const OfferBanner = ({ open, onClose }) => {

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (open) {
            setTimeout(() => setAnimate(true), 30); // Small delay for smooth animation
        } else {
            setAnimate(false);
        }
    }, [open]);

    return (
        <Drawer
            placement="bottom"
            closable={false}
            onClose={onClose}
            open={open}
            mask={false}
            height={330}
            className={`offerbanner_1 ${animate ? "open" : ""}`}
        >
            <div className="offerbanner_2">
                <div className="offerbanner_3">
                    <div className="offerbanner_4">
                        <div className="scrolling-text">
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>

                            {/* Duplicate text for smooth looping */}
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                        </div>
                    </div>

                    <div className="offerbanner_5">
                        <h5>Get $50 OFF your first booking<br /> when you book through our app!</h5>
                        <div className="offerbanner_6">
                            <h6>Discount Code - 2VQG4IMJZ</h6>
                        </div>
                    </div>
                    <div className="offerbanner_7">
                        <div className="scrolling-text">
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>

                            {/* Duplicate text for smooth looping */}
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                            <h6>$50 OFF</h6>
                        </div>
                    </div>
                </div>
                <div className="offerbanner_8">
                    <ImageLazyLoading
                        img={img}
                        alt={"offer image"}
                    />

                </div>
                <div className="offerbanner_9">
                    <h6>Download Our App NOW!!</h6>
                    <div className="offerbanner_10">
                        <Link to={'https://play.google.com/store/apps/details?id=com.ms.shahina&hl=en-US'} target="_blank">
                            <div className="offerbanner_11">
                                <img src={img1}></img>
                                <div className="offerbanner_12">
                                    <p>GET IT ON</p>
                                    <h5>Google Play</h5>
                                </div>
                            </div>
                        </Link>
                        <Link to={'https://apps.apple.com/in/app/shahina-med-spa/id6740401346'} target="_blank">
                            <div className="offerbanner_11">
                                <img src={img2}></img>
                                <div className="offerbanner_12">
                                    <p>Download on the</p>
                                    <h5>App Store</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="offerbanner_13">
                    <GrClose onClick={onClose} />
                </div>
            </div>
        </Drawer>
    );
};

export default OfferBanner;
