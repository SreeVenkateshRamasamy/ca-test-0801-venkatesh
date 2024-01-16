import React from 'react';
import { useQuery, useState } from '@apollo/client/react';

import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

import {fetchShoppingLists} from './queries.graphql';
import {deleteShoppingLists, createShoppingList} from '/.mutations.graphql';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';

const ShoppingLists = () => { 

    const [shoppingListName, setShoppingListName] = useState("");
    const [shoppingListLocale, setShoppingListLocale] = useState("");

    const {error, data, loading} = useQuery(fetchShoppingLists, {
        context : {target : GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}
    });

    const options = {
        refetchQueries: [{query: fetchShoppingLists, context: { target : GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}}]
    }


    if(loading) return "Loading...";
    if(error) return `Error page ${error.message}`;

    const {delShoppingList} = useMutation(deleteShoppingLists, options);
    const {addShoppingList} = useMutation(createShoppingLists, options);

    const handleDelete = async() => {
        const {error} = await delShoppingList({
            variables: {
                version: 1,
                id: ""
            },
            context: {target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}
        })
    }

    const cols = [
        { 
            key: 'id', 
            label: 'ID',
            renderItem: (row)=> row.id? row.id : "" 
        },
        { 
            key: 'country', 
            label: 'Country',
            renderItem: (row) => row.nameAllLocales ? row.nameAllLocales[0].value : "" 
        },
];

    const handleAdd = async() => {
        e.preventDefault();
        const {error, data} = await addShoppingList({
            variables: {
                name: shoppingListName,
                locale: shoppingListLocale,
            },
            context: {target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM}
        })
    }

    console.log(data);
    return (
        <>
            <form>
                <label>Locale:</label>
                <input type="text" value={shoppingListLocale}
                    onChange={(event) => {
                        setShoppingListLocale(event.target.value)
                    }} />
                <button onClick= {(e) => handleAddShoppingList(e)}>Add Shopping List </button>
            </form>
            <div>Shopping Lists
                <button onClick={handleDelete}>Delete Shopping List</button>
            </div>
            <DataTableManager columns={cols}>
                <DataTable rows={data?.shoppingLists?.results} />
            </DataTableManager>
        </>
    ) 
} 

export default ShoppingLists; 