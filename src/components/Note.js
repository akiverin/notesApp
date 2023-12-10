import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

const Note = ({ title, date, color, isSquare }) => {
   const formattedDate = moment(date).locale('ru').format('D MMM YYYY');

   const noteStyle = {
      backgroundColor: color,
      padding: 18,
      width: '100%',
      height: '100%',
      borderRadius: 12,
   };

   return (
      <View style={noteStyle}>
         <Text style={{ fontSize: 24, fontWeight: '400' }}>{title}</Text>
         <Text style={{ fontSize: 18, opacity: 0.5,position: 'absolute', bottom: 18, right: 18, fontWeight: '300' }}>{formattedDate}</Text>
      </View>
   );
};

export default Note;
