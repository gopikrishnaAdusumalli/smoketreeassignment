
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  
const Address = sequelize.define('Address', {
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  
User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });
  

// Define API routes here

app.post('/register', async (req, res) => {
    try {
      const { name, address } = req.body;
      const user = await User.create({ name });
      await Address.create({ address, userId: user.id });
      res.status(201).send('User and Address stored successfully');
    } catch (err) {
      res.status(500).send('Error storing data');
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(3003, () => {
  console.log("Server is running at http://localhost:3003");
});


