


Hey 👋 

I'm using json-generator (new version 😎), check: https://json-generator.com 

````text
JG.repeat(10, 15, {
  id: JG.index(66),
  amountPaid: JG.floating(50, 350, 2),
    amount: function() {
    
    const amountPaid = this.amountPaid;
    const randomValue = Math.floor(Math.random() * amountPaid) + 50;
    
    return JG.floating(0, randomValue,2);
  },
  titular: `${JG.firstName()} ${JG.lastName()}`,
  creationDate: moment(JG.date(new Date(2022, 1, 1), new Date())).format('DD/MM/YYYY hh:mm:ss'),
  status: JG.random('NW','PP','PD'),
  hasMissingDocs: JG.random(true,false),
});

````
