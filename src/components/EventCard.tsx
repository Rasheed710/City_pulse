import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './EventCard.styles';
import { EventType } from '../types';

interface Eventprops {
event:EventType
}

const EventCard:React.FC<Eventprops> = ({
event
}) => {
  const img = event?.images?.[0]?.url;

  return (
    <View style={styles.card}>
      <Image
        source={img ? { uri: img } : undefined}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {event?.name}
        </Text>

        <Text style={styles.date}>
          {event?.dates?.start?.localDate}
        </Text>
      </View>
    </View>
  );
}
export default memo(EventCard);


