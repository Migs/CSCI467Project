import {React, useState} from 'react';
import {useLocation } from 'react-router-dom';
import {TextField} from '@material-ui/core';

function SetQuote(){
    const location = useLocation();
    const [inputList, setInputList] = useState([{ lineItem: "", price: 0}]);
    var [totalprice, setTotalPrice] = useState(0);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { lineItem: '', price: 0}]);
    };

    return(
        <>
            <form>
                <TextField disabled id="customerid" label="Name" defaultValue={location.state.data.name} /><br />
                <TextField required id="associateid" label="Associate Name" /><br />
                <TextField required id="discountpercent" label="Discount %" type="number" /><br />
                <TextField required id="discountflat" label="Discount Flat" type="number" /><br />
                <TextField required id="email" label="Email" /><br />
                <TextField required id="description" label="Description" /><br />
                <TextField required id="associatesnotes" label="Notes" /><br />
                <TextField disabled id="price" label="Price" type="number" defaultValue={totalprice} /><br />
                {inputList.map((x, i) => {
                    return (
                        <>
                            <TextField required id={x.lineItem} label="Item" onChange={e => handleInputChange(e, i)} />
                            <TextField required id={x.price} label="Price" type="number" onChange={e => handleInputChange(e, i)} />
                            <div>
                                {inputList.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                            </div>
                        </>
                    );
                })}
            </form>
        </>
    );
}

export default SetQuote;