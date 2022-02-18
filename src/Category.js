import React, { useState } from 'react';
import "./Category.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

function Category({categories, getCategory, getDate, getSpecial}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [show, setShow] = useState(false);
    const [number, setNumber] = useState(0);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (category) => {
        getCategory(category)
        setAnchorEl(null);
    };

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleDate = () => {
        setShow(!show);
        getDate(number);
        setNumber(0);
    }

  return (
    <div className="category">
        <div>
        <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="category_button"
        >
            Category
        </Button>
        <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
        {categories?.map((category) => (
            <MenuItem onClick={() => handleClose(category)}>{category}</MenuItem>
        ))}
        </Menu>
        </div>
        <div>
        {number > 1900 && number <= 2018 
        ?
        <Button onClick={handleDate} className="category_Search">Search</Button>
        :
        <Button onClick={() => setShow(!show)} className="category_button">By Date</Button>
        }
            
        </div>
        {show && 
        <div style={{marginLeft:"20px"}}>
        <div style={{marginTop:"10px"}}>
            <input className="category_date" type="number" value={number} onChange={handleChange} />
        </div>
            <span style={{fontSize:"12px", color:"#fff"}}>*Enter Year between 1901 to 2018</span>
        </div>
        }
        <div>
            <Button className="category_button" onClick={() => getSpecial()}>Special Winners</Button>
        </div>
    </div>
  )
};

export default Category