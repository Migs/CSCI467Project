import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'

//Function to render the finalized quotes page
function FinalizeQuote(){
    let history = useHistory();
    const location = useLocation();
    
    var price = location.state.data.Price;
    const [finalprice, setFinalPrice] = useState(location.state.data.Price);
    const [tempprice, setTempPrice] = useState(location.state.data.Price);

    //Used to calculate the Price after discount
    useEffect(() => {
        if(location.state.data.isPercentageDiscount){
            setFinalPrice(location.state.data.Price - location.state.data.Price * location.state.data.Discount/100);
            setTempPrice(location.state.data.Price - location.state.data.Price * location.state.data.Discount/100);
        }
        else{
            setFinalPrice(location.state.data.Price - location.state.data.Discount);
            setTempPrice(location.state.data.Price - location.state.data.Discount);
        }
    }, []);

    //Used to handle the click of the finalization button
    const handleClick = () => {

        //axios call to update the quote and indicate that it is finalized
        axios.put('http://localhost:3001/quotes/' + location.state.data.QuoteID + '/' + location.state.data.QuoteID + '/' +
        location.state.data.CustomerID + '/' + location.state.data.AssociateID + '/' + finalprice + '/' +
        location.state.data.isSanctioned + '/1/' + location.state.data.isPercentageDiscount + '/' +
        location.state.data.Discount + '/' + location.state.data.Email).then((res) => {
            const article = {
                order: location.state.data.QuoteID,
                associate: location.state.data.AssociateID,
                custid: location.state.data.CustomerID,
                amount: finalprice
            };
            //gets information from the purchaseorder external component
            axios.post('http://blitz.cs.niu.edu/PurchaseOrder/', article).then((results) => {
                var str = results.data.commission;
                str.slice(0, -1);
                var commissions = parseInt(str);
                commissions = finalprice * commissions/100;
                console.log(commissions);

                //applies the commission to the associates account
                axios.get('http://localhost:3001/associates/' + location.state.data.AssociateID).then((response) => {
                        //setAssociateData(response.data[0]);
                        console.log(response.data[0].Commission);
                        //console.log(associatedata);
                        commissions = commissions + response.data[0].Commission;
                        //console.log(commissions);

                        axios.put('http://localhost:3001/associates/' + response.data[0].AssociateID + '/' + response.data[0].AssociateID + '/' +
                        response.data[0].Username + '/' + response.data[0].Pass + '/' + response.data[0].Name + '/' + commissions + '/' +
                        response.data[0].Address).then((reply) => {
                            console.log(reply.data);
                        })
                })
            })
        })
        history.push('/finalizeconfirmation');
    };

    const handleGoBackClick = () => {
        
    };

    const discountChange = (e) => {
        setFinalPrice(tempprice - e.target.value);
    };

    return(
        <>
            <TextField disabled id="price" label="Price" type="number" defaultValue={price} value={price} />
            <TextField disabled id="finalprice" label="Final Price" type="number" defaultValue={finalprice} value={finalprice} />
            <TextField id="finaldiscount" label="Add Discount" type="number" onChange={e => {discountChange(e)}} /><br />
            <Button variant="outlined" onClick={handleClick}>Finalize</Button>
            <Button variant="outlined" onClick={handleGoBackClick}>Go Back</Button>
        </>
    );
}

export default FinalizeQuote;