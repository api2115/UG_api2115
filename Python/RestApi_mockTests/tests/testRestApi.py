from unittest import TestCase
from unittest.mock import *
from src.RestApi import Api
from assertpy import *
import json

class RestApiTest(TestCase):
    def setUp(self):
        self.temp=Api()
        with open("data/api.json") as jsonFile:
            self.data=json.load(jsonFile)["data"]

    def test_get_users1(self):
        self.temp.get_users=Mock(name="get_users")
        self.temp.get_users.return_value = {"payload":self.data,"status":200}
        self.assertEqual(self.temp.get_users()["payload"],[
    {"id":1,"first_name":"Adam","last_name":"Pilarski","age":20},
    {"id":2,"first_name":"Wojtek","last_name":"Pietruszewski","age":21},
    {"id":3,"first_name":"Szymon","last_name":"Merski","age":20},
    {"id":4,"first_name":"Sebastian","last_name":"Rychert","age":21}
    ])

    def test_get_users2ServerError(self):
        m=MagicMock()
        p=PropertyMock(return_value={"payload":"DATABASE_ERROR","status":500})
        type(m).get_users = p
        assert_that(m.get_users["status"]).is_equal_to(500)

    def test_get_users3(self):
        self.temp.get_users=Mock(name="get_users")
        self.temp.get_users.return_value = {"payload":self.data,"status":200}
        self.assertEqual(self.temp.get_users()["status"],200)

    def test_get_users4(self):
        mock=Mock(self.temp)
        mock.get_users.assert_not_called()

    def test_get_users5(self):
        self.temp.users=MagicMock(return_value=self.data)
        self.temp.get_users=MagicMock(return_value={"payload":self.temp.users,"status":200})
        assert_that(self.temp.get_users()["payload"]).is_equal_to(self.temp.users)

    def test_get_user1(self):
        self.temp.get_user=MagicMock(return_value={"payload":self.data[0],"status":200})
        assert_that(self.temp.get_user(1)["payload"]).is_equal_to({"id":1,"first_name":"Adam","last_name":"Pilarski","age":20})

    def test_get_user2(self):
        mock_get_user=create_autospec(self.temp.get_user,return_value={"payload":self.data[1],"status":200})
        assert_that(mock_get_user(2)["payload"]).is_equal_to({"id":2,"first_name":"Wojtek","last_name":"Pietruszewski","age":21})

    def test_get_user3(self):
        self.temp.get_user=MagicMock(return_value={"payload":"NOT OK","status":400})
        assert_that(self.temp.get_user(10)["payload"]).is_equal_to("NOT OK")

    def test_get_user4ValueError(self):
        self.temp.get_user = MagicMock(side_effect=ValueError)
        assert_that(self.temp.get_user).raises(ValueError).when_called_with(Mock(spec=str))

    def test_get_user5(self):
        self.temp.get_user = MagicMock(side_effect=ValueError)
        assert_that(self.temp.get_user).raises(ValueError).when_called_with(Mock(spec=dict))

    def test_get_user6(self):
        self.temp.get_user=MagicMock(return_value={"payload":"NOT OK","status":400})
        assert_that(self.temp.get_user(-10)["status"]).is_equal_to(400)

    def test_get_user7(self):
        self.temp.users = MagicMock(return_value=self.data)
        self.temp.get_user = MagicMock(return_value={"payload": self.temp.users[2], "status": 200})
        assert_that(self.temp.get_user(3)["payload"]).is_equal_to(self.temp.users[2])

    def test_get_user8(self):
        mock = Mock(self.temp)
        mock.get_user(1)
        mock.get_user.assert_called_once()

    def test_post_user1(self):
        self.temp.users=self.data
        self.temp.post_user("Krzysztof", "Kozak", 12)
        m=MagicMock()
        self.data.append({"id":5,"first_name":"Krzysztof","last_name":"Kozak","age":12})
        p=PropertyMock(return_value=self.data)
        type(m).users=p
        assert_that(m.users).is_equal_to([
            {"id":1,"first_name":"Adam","last_name":"Pilarski","age":20},
            {"id":2,"first_name":"Wojtek","last_name":"Pietruszewski","age":21},
            {"id":3,"first_name":"Szymon","last_name":"Merski","age":20},
            {"id":4,"first_name":"Sebastian","last_name":"Rychert","age":21},
            {"id": 5, "first_name": "Krzysztof", "last_name": "Kozak", "age": 12}
            ])

    def test_post_user2(self):
        mock=Mock(self.temp.post_user)
        mock("Adam","Pilarski",22)
        mock("Wojtek", "Pietruszewski", 22)
        mock.assert_has_calls([call("Wojtek", "Pietruszewski", 22),call("Adam","Pilarski",22)],any_order=True)

    def test_post_user3(self):
        self.temp.post_user=MagicMock(return_value={"payload":{"id":3,"first_name":"Szymon","last_name":"Merski","age":20},"status":200})
        assert_that(self.temp.post_user("Szymon","Merski",Mock(spec=int))["payload"]).is_equal_to({"id":3,"first_name":"Szymon","last_name":"Merski","age":20})

    def test_post_user4ValueError(self):
        self.temp.post_user=MagicMock(side_effect=ValueError)
        assert_that(self.temp.post_user).raises(ValueError).when_called_with((Mock(spec=int),"Ksass",10))

    def test_post_user5ValueError(self):
        self.temp.post_user=MagicMock(side_effect=ValueError)
        assert_that(self.temp.post_user).raises(ValueError).when_called_with(("Sasda","Ksass",Mock(spec=str)))

    def test_post_user6DatabaseError(self):
        self.temp.post_user=MagicMock(return_value={"payload":"DATABASE_ERROR","status":500})
        assert_that(self.temp.post_user()["status"]).is_equal_to(500)

    def test_post_user7(self):
        self.temp.users=self.data
        self.temp.post_user("Kamil","Kowalski",34)
        self.temp.users.append({"id":self.data[-1]["id"]+1,"first_name":"Kamil","last_name":"Kowalski","age":34})
        assert_that(self.temp.users).is_equal_to([
            {"id":1,"first_name":"Adam","last_name":"Pilarski","age":20},
            {"id":2,"first_name":"Wojtek","last_name":"Pietruszewski","age":21},
            {"id":3,"first_name":"Szymon","last_name":"Merski","age":20},
            {"id":4,"first_name":"Sebastian","last_name":"Rychert","age":21},
            {"id": 5, "first_name": "Kamil", "last_name": "Kowalski", "age": 34}
            ])

    def test_post_user8(self):
        self.temp.users = self.data
        self.temp.post_user("Kamil", "Kowalski", 34)
        mockid=Mock(spec=int)
        self.temp.users.append(
            {"id": mockid, "first_name": "Kamil", "last_name": "Kowalski", "age": 34})
        assert_that(self.temp.users).is_equal_to([
            {"id": 1, "first_name": "Adam", "last_name": "Pilarski", "age": 20},
            {"id": 2, "first_name": "Wojtek", "last_name": "Pietruszewski", "age": 21},
            {"id": 3, "first_name": "Szymon", "last_name": "Merski", "age": 20},
            {"id": 4, "first_name": "Sebastian", "last_name": "Rychert", "age": 21},
            {"id": mockid, "first_name": "Kamil", "last_name": "Kowalski", "age": 34}
        ])

    def test_post_user9(self):
        self.temp.post_user = Mock(name="get_user")
        self.temp.post_user.return_value={"payload":{"id":3,"first_name":"Szymon","last_name":"Merski","age":20},"status":200}
        assert_that(self.temp.post_user("Szymon","Merski",20)["status"]).is_equal_to(200)

    def test_delete_user1(self):
        self.temp.delete_user=MagicMock(return_value={"payload":"OK","status":200})
        assert_that(self.temp.delete_user(1)["status"]).is_equal_to(200)

    def test_delete_user2(self):
        self.temp.delete_user=MagicMock(return_value={"payload":"OK","status":200})
        assert_that(self.temp.delete_user(4)["payload"]).is_equal_to("OK")

    def test_delete_user3(self):
        self.temp.delete_user=MagicMock(return_value={"payload":"DATABASE_ERROR","status":500})
        assert_that(self.temp.delete_user()["payload"]).is_equal_to("DATABASE_ERROR")

    def test_delete_user4(self):
        self.temp.delete_user=MagicMock(return_value={"payload":"NOT OK","status":400})
        assert_that(self.temp.delete_user(100)["payload"]).is_equal_to("NOT OK")

    def test_delete_user5wrongtype(self):
        self.temp.delete_user=MagicMock(side_effect=ValueError)
        assert_that(self.temp.delete_user).raises(ValueError).when_called_with(Mock(spec=str))

    def test_delete_user6wrongtype(self):
        self.temp.delete_user=MagicMock(side_effect=ValueError)
        assert_that(self.temp.delete_user).raises(ValueError).when_called_with(Mock(spec=dict))

    def test_delete_user7wrongtype(self):
        self.temp.delete_user=MagicMock(side_effect=ValueError)
        assert_that(self.temp.delete_user).raises(ValueError).when_called_with(Mock(spec=float))

    def test_delete_user8(self):
        self.temp.delete_user=MagicMock(return_value={"payload":"NOT OK","status":400})
        assert_that(self.temp.delete_user(-1)["payload"]).is_equal_to("NOT OK")

    def test_delete_user9(self):
        mock=Mock(self.temp.delete_user)
        mock(1)
        mock(2)
        mock(4)
        mock(100).assert_not_called()

    def test_delete_user10(self):
        open = mock_open(read_data="OK")
        with open('/fake/file/path.txt', 'r') as f:
            payload = f.read()
        self.temp.delete_user = MagicMock(return_value={"payload":  payload, "status": 200})
        assert_that(self.temp.delete_user(-1)["payload"]).is_equal_to("OK")

    def test_put_user1(self):
        open = mock_open(read_data="200")
        with open('/fake/file/path.txt','r') as f:
            status=int(f.read())
        self.temp.put_user=MagicMock(return_value={"payload":{"id":1,"first_name":"Krzysztof","last_name":"Pilarski","age":30},"status":status})
        assert_that(self.temp.put_user(1,"Krzysztof","Pilarski",30)["status"]).is_equal_to(200)

    def test_put_user2(self):
        self.temp.put_user=MagicMock(return_value={"payload":{"id":2,"first_name":"Krzysztof","last_name":"Pietruszewski","age":30},"status":200})
        assert_that(self.temp.put_user(2,"Krzysztof","Pietruszewski",30)["payload"]["first_name"]).is_equal_to("Krzysztof")

    def test_put_user3(self):
        self.temp.put_user = MagicMock(return_value={"payload": "NOT OK", "status": 400})
        assert_that(self.temp.put_user(100,"Krzysztof","Ppp",12)["payload"]).is_equal_to("NOT OK")

    def test_put_user4(self):
        self.temp.put_user = MagicMock(return_value={"payload": "DATABASE_ERROR", "status": 500})
        assert_that(self.temp.put_user()["payload"]).is_equal_to("DATABASE_ERROR")

    def test_put_user5ValueError(self):
        self.temp.put_user=MagicMock(side_effect=ValueError)
        assert_that(self.temp.put_user).raises(ValueError).when_called_with(Mock(spec=str),"Adi",'Adi',20)

    def test_put_user6(self):
        self.temp.users=self.data
        self.temp.put_user(3,"Krystian","Szczupak",87)
        self.temp.users[2] = {"id":3,"first_name":"Krystian","last_name":"Szczupak","age":87}
        assert_that(self.temp.users).is_equal_to([
            {"id":1,"first_name":"Adam","last_name":"Pilarski","age":20},
            {"id":2,"first_name":"Wojtek","last_name":"Pietruszewski","age":21},
            {"id":3,"first_name":"Krystian","last_name":"Szczupak","age":87},
            {"id":4,"first_name":"Sebastian","last_name":"Rychert","age":21}
            ])

    def test_put_user7(self):
        mock=Mock(self.temp)
        mock.get_users()
        mock.get_user(1)
        mock.delete_user(1)
        mock.put_user.assert_not_called()