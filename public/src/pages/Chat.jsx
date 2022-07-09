import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { drewRoute, allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(currentUser.username === "Drew"? `${allUsersRoute}/${currentUser._id}`:`${drewRoute}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }

      if (currentUser.username === "You"){
        const drewChat = {_id: '62c2ede389792bb39ed1823a', username: 'Drew', avatarImage: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiNiY2Y3MDA7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojZmZjZTk0OyIvPjxwYXRoIGQ9Im0xMTUuNSAyMzFhMTE1IDExNSAwIDAgMCA2NC4yMy0xOS41IDExNC43OSAxMTQuNzkgMCAwIDAtMzgtMTYuNWwtMi40MS05YTEyNS4xOSAxMjUuMTkgMCAwIDAtMTMuMzItMi4yOHY4Ljc1cTMuNTIgMC4zMiA3IDAuODRsLTE3LjUgMTcuNDgtMTcuNS0xNy40OHEzLjQ1LTAuNTIgNy0wLjg0di04Ljc1YTEyNS41NSAxMjUuNTUgMCAwIDAtMTMuMzQgMi4yOGwtMi40MSA5YTExNC43OSAxMTQuNzkgMCAwIDAtMzggMTYuNSAxMTQuOTQgMTE0Ljk0IDAgMCAwIDY0LjI1IDE5LjV6IiBzdHlsZT0iZmlsbDojZWUyODI5OyIvPjxwYXRoIGQ9Im0xMzIuOTggMTkzLjMzLTM2LjE4NSAzNi4xNTUtMi40LTAuNDIgMzYuMTA4LTM2LjA4MXoiIHN0eWxlPSJmaWxsOiNmZjA7Ii8+PHBhdGggZD0ibTQzLjg5MSA3Ny44MzZjLTUuMTEyNCAyOC4yMzcgMi4xMzQ3IDYxLjAwNCAyNC43OTIgODEuMzMyLTYuMjM2Mi0xMi41MDMtOS41MzYyLTMzLjk0OC05LjQ4ODctNDUuNDU4LTAuNTAyMDMtMzcuNDczIDQxLjQzOS00Ni4zMzUgNTYuMTQ5LTE3LjYxNCAxOC44LTMxLjIgNTIuODI1LTE2Ljg3MiA1NC4wNjIgMTMuNzE0IDAuNTYwMTggMTMuODQ0LTAuNDM1NjggMjUuNTk4LTcuMDk2MiA0OC45NjYgMTguMzcyLTEyLjQ3IDI4LjAxMi01My45NTkgMjMuNTQ1LTgwLjk0MS00Ny40ODYtMi4yNTUyLTk0LjgzMS0yLjU3MjQtMTQxLjk2IDB6IiBzdHlsZT0iZmlsbDojOGVmZjQ1OyIvPjxwYXRoIGQ9Im0xMTEuMjYgMTIuNzgyYy0xOC41MDggMC4wNzkxLTMyLjU5NCAzLjYxNjMtMzIuNTk0IDMuNjE2MyAyNC41MTMgNS42MDAyIDMyLjgwNyAxMC41MDQgMzEuNzQzIDE5LjgzNS0wLjg3MjI3IDkuNzAyLTExLjA5MiAxMC44NzUtMjAuODExIDExLjU1NC01LjI1NDggMC4zNjQxNC0xMC45NDkgMC43MTUyMy0xNi4zOTEgMS43NTI1LTExLjg2MiAyLjI4MTgtMTkuOTQ2IDQuMzczNi0yNC40NDcgMTEuOTU2LTEuNzAxMiAyLjg2NjItMy43OTQ1IDEwLjQyOC00Ljg2ODkgMTYuMzRoMTQxLjk2Yy01LjcyNDItMzguNTYzLTMyLjU1Ny02NS4wNzMtNzQuNTk1LTY1LjA1NHoiIHN0eWxlPSJmaWxsOiM4ZWZmNDU7Ii8+PHBhdGggZD0ibTczLjI5MiA0NC43N2MtMTEuNzg4IDIuMjgxNi0xOC45MjMgNS41NDQ0LTIzLjM5NCAxMy4xMjYtMi44NDg0IDYuNzU4Ni00Ljg0NTQgMTMuMjM4LTYuMDA3MiAxOS45MzloMTQxLjk2Yy0xLjk3NzItMTQuNTc2LTYuODY3Ny0yOC4yNDgtMTkuMjc3LTMyLjA5OC0yOC44MzQtNi4zMzA4LTYzLjc3NC02LjM1NTMtOTMuMjg1LTAuOTY3NjF6IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im0xNjUuOTUgMzUuNjQyYy0xMS4xNzggMjEuODI5LTkxLjg5IDE5LjM2LTEwMy45OCAyLjMwMTEtOS43MDMgMTIuMjY3LTE1LjYwNSAyNS44ODMtMTguMDc5IDM5Ljg5MmgxNDEuOTZjLTMuMDA5Ni0xNy4xNTgtOS43NDI0LTMyLjY4OC0xOS45MDItNDIuMTkzeiIgc3R5bGU9ImZpbGw6bm9uZTsiLz48cGF0aCBkPSJtNzAuOTU5IDk0Ljk4NWgzNS4wMzFjMi40MDg2IDFlLTUgNC4zNjEyIDEuOTUyMyA0LjM2MTIgNC4zNjA2bC0yLjU4NjQgMTcuNTExYy0wLjM1MTUgMi4zNzk5LTEuNzIxOCA0LjM2MDYtMy44NDU3IDQuMzYwNmgtMzAuOWMtMi4xMjM5LTFlLTUgLTMuODQ1Ny0xLjk1MjMtMy44NDU3LTQuMzYwNmwtMi41ODY0LTE3LjUxMWMxZS01IC0yLjQwODIgMS45NTI2LTQuMzYwNiA0LjM2MTItNC4zNjA2eiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjMuMDA0NXB4O3N0cm9rZTojMDAwOyIvPjxwYXRoIGQ9Im0xNjAuMDUgOTQuOTg1aC0zNS4wMzFjLTIuNDA4NiAxZS01IC00LjM2MTIgMS45NTIzLTQuMzYxMiA0LjM2MDZsMi41ODY0IDE3LjUxMWMwLjM1MTQ5IDIuMzc5OSAxLjcyMTggNC4zNjA2IDMuODQ1NyA0LjM2MDZoMzAuOWMyLjEyMzktMWUtNSAzLjg0NTctMS45NTIzIDMuODQ1Ny00LjM2MDZsMi41ODY0LTE3LjUxMWMtMWUtNSAtMi40MDgyLTEuOTUyNi00LjM2MDYtNC4zNjEyLTQuMzYwNnoiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDozLjAwNDVweDtzdHJva2U6IzAwMDsiLz48cGF0aCBkPSJtOTAuNjA3IDEwMi4zNWE0LjYzMzcgNC42MzMyIDAgMSAwIDQuNjg5MiA0LjYzMzcgNC42MzM3IDQuNjMzMiAwIDAgMC00LjY4OTItNC42MzM3em00OS43MiAwYTQuNjMzNyA0LjYzMzIgMCAxIDAgNC42NDQ0IDQuNjMzNyA0LjYzMzcgNC42MzMyIDAgMCAwLTQuNjQ0NC00LjYzMzd6IiBzdHlsZT0iZmlsbDojNWEwMDAwOyIvPjxwYXRoIGQ9Im03MC42NiA5NC45ODVoLTExLjc3NSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjMuMDA0NXB4O3N0cm9rZTojMDAwOyIvPjxwYXRoIGQ9Im0xNzIuMTMgOTQuOTg1aC0xOS40ODQiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDozLjAwNDVweDtzdHJva2U6IzAwMDsiLz48cGF0aCBkPSJtMTA5LjMyIDEwNi4yYzQuMjA0NS0yLjQyNyA5LjMwMzYtMS45MTMgMTIuMzUzLTAuMDI1OCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjMuMDA0NXB4O3N0cm9rZTojMDAwOyIvPjxwYXRoIGQ9Im0xNDguMzMgMTA5Ljc5LTUuNzYyNi04LjIzMjQiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo0O3N0cm9rZTpub25lOyIvPjxwYXRoIGQ9Im0xNTYuMjcgMTA1LTIuNDAzLTMuNDMyOCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlOm5vbmU7Ii8+PHBhdGggZD0ibTgyLjc0OCAxMTQuMzQtOC45NDg5LTEyLjc4NCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlOm5vbmU7Ii8+PHBhdGggZD0ibTkxLjQwOCAxMDkuNzktNS43NjI2LTguMjMyNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlOm5vbmU7Ii8+PHBhdGggZD0ibTk3LjA2IDE0NC41OWEyMC4xNSAyMC4xNSAwIDAgMCAzNi44OCA0LjUzeiIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjIuOTk5OXB4O3N0cm9rZTojMDAwOyIvPjwvc3ZnPg=='};
        setCurrentChat(drewChat);
      }
    }

  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          {currentUser?.username === "You"? (<div> </div>):(<Contacts contacts={contacts} changeChat={handleChatChange}/>)}
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} currentUsername={currentUser.username}/>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height:100vh;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .container {
    margin: 1rem;
    display: flex;
    justify-content: center;
    height: 100%;
    @media screen and (min-width: 320px) and (max-width: 768px) and (min-height: 550px){
      height: 60%;
      position: fixed;
    }
    background-color: #00000076;

  }
`;
