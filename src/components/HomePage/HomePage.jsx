import { Flex, Heading, Input, Button, Img, SimpleGrid, IconButton, Box, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// imports for react icons
import { FaStar } from 'react-icons/fa'
import { FaCheck } from "react-icons/fa";

export default function HomePage() {

    // bring in current user from the store 
    const user = useSelector((store) => store.user);

    // bring in the search reducer
    const searchResults = useSelector((store) => store.search)

    // init dispatch
    const dispatch = useDispatch();

    // set state for giphy search
    const [search, setSearch] = useState('');


    return (
        <Flex gap={4} padding={2} direction={'column'} justifyContent={'center'}>
            <Flex>
                <Heading>Welcome, {user.username}!</Heading>
            </Flex>
            <Flex direction={'row'} w={'25%'} gap={2} padding={1} justifyContent={'center'}>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button onClick={() => dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: search })}>Search</Button>
            </Flex>
            {/* is a user searching? if so, show this */}
            {user.id ?
                <>
                    <SimpleGrid columns={3} spacing={4}>
                        {searchResults.map(gif => (
                            <Box key={gif.id} p={4} borderWidth="1px" borderColor="gray.300" borderRadius="md">
                                <Flex flexDirection={'column'} position={'relative'}>
                                    <Flex gap={4} flexDirection={'column'}>
                                        <Img on key={gif.id} src={gif.images.original.url} />
                                        <Flex alignItems={'center'} mt={2}>

                                            <IconButton icon={<FaCheck />} size={'sm'} onClick={() => dispatch({
                                                type: 'ADD_NEW_FAV',
                                                payload: {
                                                    url: gif.images.original.url,
                                                    rating: null,
                                                    comment: null
                                                }
                                            })} />

                                        </Flex>

                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </>
                :
                <></>}
        </Flex>
    )
}