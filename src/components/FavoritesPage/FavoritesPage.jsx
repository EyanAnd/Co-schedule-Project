import { Flex, Heading, Img, Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function FavoritesPage() {

    const dispatch = useDispatch();
    const favs = useSelector((store) => store.favorites)
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_FAV' });
    }, [favs])

    // set state for comments
    const [comments, setComments] = useState('');

    // ratings state
    const [ratings, setRatings] = useState({});

    // IDEA FOR RATING
    // <Text>Rate: </Text>
    // {[1, 2, 3, 4, 5].map((rating) => (
    //     <IconButton key={rating} icon={<FaStar />}
    //         size={'sm'}
    //         color={ratings[gif.id] >= rating ? 'yellow.500' : 'gray.200'}
    //         aria-label={`Rate ${rating}`}
    //         onClick={() => rateGif(gif.id, rating)} />
    // ))}

    // function for rating a gif
    // const rateGif = (gifId, rating) => {
    //     setRatings((prevRatings) => ({
    //         ...prevRatings,
    //         [gifId]: rating,
    //     }));
    // };
    return (
        <Flex>
            <SimpleGrid columns={3} spacing={4}>
                {favs.map(gif => (
                    <Box key={gif.id} p={4} borderWidth="1px" borderColor="gray.300" borderRadius="md">
                        <Flex flexDirection={'column'} position={'relative'}>
                            <Flex gap={4} flexDirection={'column'}>
                                <Img key={gif.id} src={gif.url} />
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    )
}