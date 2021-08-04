import {React, useState, useEffect, forwardRef} from 'react';
import {useLocation } from 'react-router-dom';
import {TextField} from '@material-ui/core';
import MaterialTable from 'material-table';
import axios from 'axios'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useHistory } from 'react-router-dom';


const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

function AdminPage(props){
	
    const [associatedata, setAssociatedata] = useState([]);
    const [quotedata, setQuotedata] = useState([]);
    let history = useHistory();
    const location = useLocation();
    
	//Something probably needs to go here to define the data that was sent from the previous page


	//Line item column setup
    const associateColumns = [
        {title: 'Associate ID', field:'AssociateID'},
        {title: 'Username', field:'Username'},
        {title: 'Password', field:'Pass'},
        {title: 'Name', field:'Name'},
        {title: 'Commission', field:'Commission'},
        {title: 'Address', field:'Address'}
    ]
	
	//Note column setup
	const quoteColumns = [
        {title: 'Quote ID', field:'QuoteID'},
        {title: 'Customer ID', field:'CustomerID'},
        {title: 'Associate ID', field:'AssociateID'},
        {title: 'Price', field:'Price'},
		{title: 'Percentage Discount?', field:'isPercentageDiscount'},
		{title: 'Purchased?', field:'isPurchased'},
		{title: 'Discount', field:'Discount'},
		{title: 'Time', field:'Time'},
		{title: 'Email', field:'Email'}
    ]


    //use Effect to run when the component is rendered, or the page is refreshed
    useEffect(() => {
            //axios used to get associate information
            axios.get('http://localhost:3001/associates/').then((res) => {
                setAssociatedata(res.data);
                console.log(res.data);
            });
            //axios used to get quotes information
            axios.get('http://localhost:3001/quotes/').then((res) => {
                setQuotedata(res.data);
                console.log(res.data);
            });
    }, []);

    //Handles the row clicks,
    //when clicked will redirect user to a page where they can edit associate information
    function handleRowClick(event, rowData){
        history.push({
            pathname: '/editassociate',
            state: {data: rowData}
        })
    };
	
	//Create the Line Items table
	//Going to need an onRowUpdate/onRowDelete/onRowAdd so we can edit
    return(
        <>
            <div>
                {/* Used to render a dynamic table of associates */}
                <MaterialTable title="Associates"
                data={associatedata}
                columns={associateColumns}
                icons={tableIcons}
                options={{filtering:true}}
                onRowClick={handleRowClick}>
                </MaterialTable>
            </ div>
            <div>
                {/* Used to render a dynamic table of quotes */}
                <MaterialTable title="Quotes"
                data={quotedata}
                columns={quoteColumns}
                icons={tableIcons}
                options={{filtering:true}}>
                </MaterialTable>
            </ div>
        </>
    );
}
export default AdminPage;