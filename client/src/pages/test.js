import { Box, Center, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function TestPage() {
  const [data, setData] = useState([]);
  const numberApi = data.number;
  //   console.log(height);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    await axios
      .get(
        "https://numbersapi.p.rapidapi.com/random/trivia?min=1&max=10&json=true",
        {
          headers: {
            "X-RapidAPI-Key":
              "5c9748c56emshd01f86a5c928918p19312ajsn50945d485c59",
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function printTriangle(height) {
    const arr = [];
    for (let i = 1; i <= height; i++) {
      let row = "";
      for (let j = 1; j <= i; j++) {
        row += "* ";
      }
      console.log(row);
      arr.push(<Box>{row}</Box>);
    }
    return <Box>{arr}</Box>;
  }

  return (
    <Center h={"100vh"}>
      <Box className="App">
        <h1>Hello Purwadhika Student !</h1>
        <div>(print random number from API here)</div>
        <Text>{`random number from api: ${numberApi}`}</Text>
        <div>(print '*' in triangles or squares shape here)</div>

        <Box h={"100px"}>{printTriangle(numberApi)}</Box>
      </Box>
    </Center>
  );
}
