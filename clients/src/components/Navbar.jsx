import React from 'react'
import { IconButton } from "@mui/material"
import { Search, Person, Menu } from "@mui/icons-material"
import variables from "../Styles/variables.scss"
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import "../Styles/Navbar.scss"
import { Link, useNavigate } from "react-router-dom"
import { setLogout } from "../Redux/State"

export const Navbar = (user) => {
    return (
        <div className='navbar'>
            <a href="/">
                <img src="/assests/logo.png" alt="logo" />
            </a>
            <div className="navbar_search">
                <input type="text" placeholder='Search ...' />
                <IconButton>
                    <Search style={{ color: variables.pinkred }} />
                </IconButton>
            </div>
            <div className="navbar_right">
                {user ? <a href='/create-listening'>Become a Host</a> : <a href='/login'>Become a Host</a>}
                <button className='navbar_right_account'>
                    <Menu style={{ color: variables.darkgrey }} />
                    {!user ? (
                        <Person style={{ color: variables.darkgrey }} />
                    ) : (
                        <img
                        src={`http://localhost:3001/${user.profileImagePath.replace(
                          "public",
                          ""
                        )}`}
                        alt="profile photo"
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />
                )}
                </button>
            </div>
        </div>
        // <>
        // homepage</>
    )
}