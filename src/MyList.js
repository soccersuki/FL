import {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import {Paper, Stack, Typography, IconButton, InputBase, Box, Slider, Chip} from '@mui/material'

import ShuffleIcon from '@mui/icons-material/Shuffle';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';


import { grey, pink } from '@mui/material/colors';


import data from './yoshinoya.json'

export default function MyList() {
  const [foods, setFoods] = useState(data);
  const [text, setText] = useState("");
  const [value, setValue] = useState([0, 2000]);

  useEffect(() => {
    console.log('effect')
    const foods = data.filter((food) => {
      var ok = food[0].includes(text);
      ok = ok && food[3] > value[0] && food[3] < value[1];
      return ok;
    })
    setFoods(foods);
  }, [text, value])

  return (
    <Stack spacing={2}>
    <Typography fontSize={30}>
      <b>吉野家</b>
    </Typography>
    <MySlider setFoods={setFoods} text={text} value={value} setValue={setValue}/>
    <Chips setValue={setValue}/>
    <MyInput setFoods={setFoods} text={text} setText={setText} value={value}/>
    <Buttons foods={foods} setFoods={setFoods}/>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {foods.map(food => {
        return(
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${food[0]} ${food[1]}`}
              secondary={`${food[3]} ${food[4]} ${food[5]} ${food[6]}`}
            />
          </ListItem>
        )
      })}
    </List>
    </Stack>
  );
}

function Chips(props){
  const {setValue} = props;
  const handleClick1 = () => {
    setValue([700, 1000]);
  }
  const handleClick2 = () => {
    setValue([400, 600]);
  }
  return(
    <Stack direction="row">
      <Chip label="筋トレ" onClick={handleClick1}/>
      <Chip label="ダイエット" onClick={handleClick2}/>
    </Stack>
  )
}


function Buttons(props) {
  const {foods, setFoods} = props
  const handleChange = (event) => {
    var id = event.target.value;
    if(id == 0) ;
    else if(id == 1) foods.sort((a, b) => b[3] - a[3]);
    else if(id == 2) foods.sort((a, b) => a[3] - b[3]);
    else if(id == 3) foods.sort((a, b) => b[4] - a[4]);
    else if(id == 4) foods.sort((a, b) => a[4] - b[4]);
    else if(id == 5) foods.sort((a, b) => b[5] - a[5]);
    else if(id == 6) foods.sort((a, b) => a[5] - b[5]);
    else if(id == 7) foods.sort((a, b) => b[6] - a[6]);
    else if(id == 8) foods.sort((a, b) => a[6] - b[6]);
    console.log(id)
    setFoods([...foods])
  }

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" sx={{width: '100%'}}>
      <Stack onClick={props.handleClick1}direction="row" alignItems='center' justifyContent="center" spacing={1} sx={{width: '48%', bgcolor: grey[200], color: pink[200], borderRadius: '10px', boxSizing: 'border-box', p: 1}}>
        <ShuffleIcon />
        <Typography fontSize={15} color={pink[200]} align="center">ランダム</Typography>
      </Stack>
      <Stack direction="row" alignItems='center' justifyContent="center"  spacing={1} sx={{width: '48%', bgcolor: grey[200], color: pink[200], borderRadius: '10px', boxSizing: 'border-box', p: 1}}>
        <SortIcon />
        <Paper elevation={0} onChange={handleChange}component='select' sx={{bgcolor: grey[200], color: pink[200], outline: 'none', border: 'none', fontSize: 15}}>
          <option value={0}>デフォルト</option>
          <option value={1}>カロリー多</option>
          <option value={2}>カロリー少</option>
          <option value={3}>たんぱく質多</option>
          <option value={4}>たんぱく質少</option>
          <option value={5}>脂質多</option>
          <option value={6}>脂質少</option>
          <option value={7}>炭水化物多</option>
          <option value={8}>炭水化物少</option>
        </Paper>
      </Stack>
    </Stack>
  );
}

function MyInput(props) {
  // const [text, setText] = useState('')
  const {text, setText, setFoods, value} = props;

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const text = e.target.value;
    setText(text);
    // const foods = data.filter((food) => {
    //   var ok = food[0].includes(text);
    //   ok = ok && food[3] > value[0] && food[3] < value[1];
    //   return ok;
    // })
    // setFoods(foods);
  }

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', width: '100%', bgcolor: grey[200] }}
      onSubmit={handleSubmit}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={text}
        onChange={handleChange}
      />
    </Paper>
  );
}


function MySlider(props) {
  const {text, setFoods, value, setValue} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeCommited = () => {
    console.log('commit');
    // const foods = data.filter((food) => {
    //   var ok = food[0].includes(text);
    //   ok = ok && food[3] > value[0] && food[3] < value[1];
    //   return ok;
    // })
    // setFoods(foods);
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={100}
        marks
        min={0}
        max={2000}
        onChangeCommitted={handleChangeCommited}
      />
    </Box>
  );
}
