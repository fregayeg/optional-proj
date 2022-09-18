## Usage/Examples

```typescript
import { CardViewWitououtIcon } from '../components/CardViewWitououtIcon';

function Test() {
  return (
    <View style={styles.container}>
      {[
        {
          Ndossier: 'N°340985',
          id: 1,
          total: '30$',
          name: 'Yassine GARA',
          date: '22/22/2000',
          state: 'En cours',
        },
      ].map((item) => (
        <CardViewWitououtIcon
          key={item.id}
          Ndossier={item.Ndossier}
          total={item.total}
          name={item.name}
          date={item.date}
          state={item.state}
          onPress={(e) => handelPress(e)}
        />
      ))}
    </View>
  );
}
```

## Props

1. Ndossier : `String`
2. total : `String`
3. name : `String`
4. date : `String`
5. state : `StateTypes`

### StateTypes

```javascript
enum StateTypes {
  EnCours = 'En cours',
  EnAttente = 'En attente',
  Rembourse = 'Remboursé',
  PartiellementRembourse = 'Partiellement remboursé',
}
```
