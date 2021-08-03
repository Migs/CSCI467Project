import {React, useState} from 'react';
import {useLocation } from 'react-router-dom';
import {TextField} from '@material-ui/core';

function SetQuote(){
    const location = useLocation();
    const [inputList, setInputList] = useState([{ lineItem: '', price: 0, description: ''}]);
    const [notesList, setNotesList] = useState([{notes: ''}]);
    var [totalprice, setTotalPrice] = useState(0);

    const sumInputList = () => {
        const tprice = inputList.reduce((a, { price }) => parseInt(a) + parseInt(price), 0);
        setTotalPrice(tprice);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        sumInputList();
    };

    const handleNotesInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...notesList];
        list[index][name] = value;
        setNotesList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        sumInputList();
    };

    const handleRemoveNotesClick = index => {
        const list = [...notesList];
        list.splice(index, 1);
        setNotesList(list);
        sumInputList();
    };

    const handleAddClick = () => {
        setInputList([...inputList, { lineItem: '', price: 0}]);
        sumInputList();
    };

    const handleAddNotesClick = () => {
        setNotesList([...notesList, { notes: ''}]);
        
    };

    return(
        <>
            <form>
                <TextField disabled id="customerid" label="Name" defaultValue={location.state.data.name} /><br />
                <TextField required id="associateid" label="Associate Name" /><br />
                <TextField required id="discountpercent" label="Discount %" type="number" /><br />
                <TextField required id="discountflat" label="Discount Flat" type="number" /><br />
                <TextField required id="email" label="Email" /><br />
                {notesList.map((x, i) => {
                    return (
                        <>
                            <TextField required id={x.notes} label="Notes" name='notes' onChange={e => handleNotesInputChange(e, i)} />
                            <div>
                                {notesList.length !== 1 && <button onClick={() => handleRemoveNotesClick(i)}>Remove</button>}
                                {notesList.length - 1 === i && <button onClick={handleAddNotesClick}>Add</button>}
                            </div>
                        </>
                    );
                })
                    
                }
                <TextField disabled id="price" label="Price" type="number" defaultValue={totalprice} value={totalprice}/><br />
                {inputList.map((x, i) => {
                    return (
                        <>
                            <TextField required id={x.lineItem} label="Item" name="lineItem" onChange={e => handleInputChange(e, i)} />
                            <TextField required id={x.price + ''} label="Price" type="number" name="price" onChange={e => handleInputChange(e, i)} />
                            <TextField required id={x.description} label="Description" name="description" onChange={e => handleInputChange(e, i)} />
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