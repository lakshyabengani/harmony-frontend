import React, { useState } from "react";
import { Row, Col} from "react-bootstrap";
import HomeNavBar from "../components/HomeNavBar";
import "../styles/sidebar.style.css";
import SwipeDeck from "../components/swipeDeck";
import SideBar from "../components/SideBar";
import ProfileModal from "../components/profileModal";
import { useInterval } from "../utils/Pollings";
import { getNotifications } from "../api/backend";
import NotificationModal from "../components/notificationModal";
import { notifications } from "../config";

const HomePage = (props) => {

    const [profileModalShow,setProfileModalShow] = useState(false);
    const [notificationShow,setNotificationShow] = useState(false);
    const [notifyList,setNotifyList] = useState([])
    const [userId,setUserId] = useState(localStorage.getItem('public_user_id'));

    function toggelModalShow(show) {
        setProfileModalShow(show);
    }
    
    function toggelNotificationShow(show) {

        setNotificationShow(show);
    }
    
    function setId(id){
        setUserId(id);
    }

    //Notifications  
  useInterval(async() =>{
    try{
      const res = await getNotifications(new Date().toISOString());
    //   console.log(res)
    //   console.log(res.data.notifications);
      setNotifyList(res.data.notifications);
    }catch(err){
    //   console.log(err);
    }
  },5*1000)

    return (
        <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
            <HomeNavBar 
                setShow={toggelModalShow}
                setId={setId}
                notifyShow={toggelNotificationShow}
            />
            <Row>
                <Col xs={9}>
                    <SwipeDeck />
                </Col>
                <Col
                    xs={3}
                    style={{
                        borderLeft: "thin solid #000",
                        paddingRight: 30,
                        top: 99,
                        bottom: 0,
                        right: 0,
                        position: "fixed",
                        width: "500px",
                    }}
                >
                    <SideBar 
                        setShow={toggelModalShow}
                        setId={setId}
                        notifications={notifyList}
                    />
                </Col>
            </Row>
            <ProfileModal
                show={profileModalShow}
                onHide={toggelModalShow}
                userId={userId}
            />
            <NotificationModal
                show={notificationShow}
                onHide={toggelNotificationShow}
                list={notifyList}
            />
        </div>
    );
};

export default HomePage;
