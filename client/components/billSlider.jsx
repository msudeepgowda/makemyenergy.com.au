import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box
  } from '@chakra-ui/react'
  
import { useState } from 'react'

export default function BillSlider() {
    const [sliderValue, setSliderValue] = useState(50)

    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    }
  
    return (
      <Box pt={6} pb={2}>
        <Slider aria-label='slider-ex-6' onChange={ (val) => setSliderValue(val)} >
          <SliderMark value={0} {...labelStyles} className="pl-2">
            $0
          </SliderMark>
          <SliderMark value={88} {...labelStyles}>
            $750+
          </SliderMark>
          <SliderMark
            textAlign='center'
            bg='blue.900'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
            value={sliderValue}
          >
            ${sliderValue*7.5}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    )
  }