import { Flex, Heading, Input, Button, Img, SimpleGrid, IconButton, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// imports for react icons
import { FaPlus } from "react-icons/fa";

export default function HomePage() {

    // init dispatch
    const dispatch = useDispatch();
    // bring in current user from the store 
    const user = useSelector((store) => store.user);

    // bring in the search reducer
    const searchResults = useSelector((store) => store.search)

    // set state for giphy search
    const [search, setSearch] = useState('');

    return (
        <Flex gap={4} padding={2} direction={'column'} justifyContent={'center'}>
            <Flex p={4} gap={4} direction={'column'}>
                <Heading size={'xs'} color={'brand.text'} textTransform={'uppercase'} align={'center'}>Search for a gif </Heading>
                <Flex justifyContent={'center'} align={'center'} gap={2} padding={1}>
                    <Flex w={'25%'}>
                        {/* set the search to what the user typed in */}
                        <Input color={'brand.text'} value={search} onChange={(e) => setSearch(e.target.value)} />
                    </Flex>
                    {/* dispatch to send the search results */}
                    <Button color={'white'} bgColor={'brand.orange'} onClick={() => dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: search })}>Search</Button>
                </Flex>
            </Flex>
            {/* is a user searching? if so, show this */}
            {user.id ?
                <>
                    <SimpleGrid columns={3} spacing={4}>
                        {searchResults.map(gif => (
                            <Box key={gif.id} p={4} borderWidth="1px" borderColor="brand.accent" borderRadius="md">
                                <Flex flexDirection={'column'} position={'relative'}>
                                    <Flex direction={'column'}>
                                        <Flex justifyContent={'space-between'} p={4} >
                                            {/* user has the ability to add gifs to their favs list */}
                                        <Text>Click the plus icon to add to your favorites!</Text>
                                            <IconButton icon={<FaPlus />} size={'sm'} onClick={() => dispatch({
                                                type: 'ADD_NEW_FAV',
                                                payload: {
                                                    url: gif.images.original.url,
                                                    rating: null,
                                                    comment: null
                                                }
                                            })} />
                                        </Flex>
                                        <Flex gap={4} flexDirection={'column'}>
                                            <Img on key={gif.id} src={gif.images.original.url} />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </>
                :
                // if a non-registered user is searching show this
                <>
                    <Flex justifyContent={'center'} >
                        <Heading color={'brand.text'} size={'sm'} textTransform={'uppercase'}>Login to create a list of your fav gifs!</Heading>
                    </Flex>
                    <SimpleGrid columns={3} spacing={4}>
                        {/* map over the search results */}
                        {searchResults.map(gif => (
                            <Box key={gif.id} p={4} borderWidth="1px" borderColor="brand.accent" borderRadius="md">
                                <Flex flexDirection={'column'} position={'relative'}>
                                    <Flex gap={4} flexDirection={'column'}>
                                        {/* they can only view gifs, cannot really interact like a user can */}
                                        <Img on key={gif.id} src={gif.images.original.url} />
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </>}
        </Flex>
    )
}