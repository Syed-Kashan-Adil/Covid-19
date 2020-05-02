import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, View, FlatList } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button as NativeButton, Icon, Left, Body, Right, Title, List, ListItem } from 'native-base';
import { userDetail, getTempratureRecord, updateCovidStatus } from "../apis"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const QRcolors = {
    0: "green",
    1: "yellow",
    2: "red"
}
class UserDetail extends Component {
    state = {
        user: {},
        loading: true,
        tempratureRecord: []
    }
    async  componentDidMount() {

        const { route: { params: { id: userId } } } = this.props
        const [response, tempratureResponse] = await Promise.all([
            userDetail(userId),
            getTempratureRecord(userId)
        ])

        if (response.status) {
            const { user } = response.data;
            this.setState({ user })
        }
        const { status, data } = tempratureResponse
        if (status) {
            this.setState({ tempratureRecord: data.tempratureRecord })
        }
        return this.setState({ loading: false })
    }
    render() {

        const { user: { _id, fullName, joinDate, address, phoneNumber, status }, loading, tempratureRecord } = this.state;
        const { navigation } = this.props
        return (
            <Container >
                <Header style={{ backgroundColor: "#9F1D8D" }} >

                    <Left>
                        <NativeButton transparent>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name='arrowleft' type="AntDesign" />
                            </TouchableOpacity>
                        </NativeButton>
                    </Left>
                    <Body>
                        <Title>User Detail</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                {
                    loading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#404040ae" }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View> : (
                            <Content style={{ flex: 1, backgroundColor: "#404040ae" }}>

                                <Card style={{ width: "90%", marginTop: 30, alignSelf: "center", flex: 0.2 }}>
                                    <CardItem>
                                        <Left>
                                            <QRCode
                                                value={_id}
                                                backgroundColor={QRcolors[status]}
                                                color={"#000"}
                                                size={50}


                                            />
                                            <Body>
                                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{fullName.toUpperCase()}</Text>
                                                <Text note>Join Date:  {new Date(joinDate).toLocaleDateString()}</Text>
                                            </Body>

                                        </Left>
                                        <Right style={{ marginBottom: 20 }}>
                                            <Menu onSelect={status => {
                                                const { user } = this.state;
                                                this.setState({ user: { ...user, status } })
                                                return updateCovidStatus(_id, status)

                                            }}>
                                                <MenuTrigger text='Change Covid Status' />
                                                <MenuOptions>

                                                    <MenuOption value={0}>
                                                        <Text style={{ color: 'green' }}>Green</Text>
                                                    </MenuOption>
                                                    <MenuOption value={1}>
                                                        <Text style={{ color: 'yellow' }}>Yellow</Text>
                                                    </MenuOption>
                                                    <MenuOption value={2}>
                                                        <Text style={{ color: 'red' }}>Red</Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Left style={{ flexDirection: 'column', alignItems: "flex-start" }}>
                                            <NativeButton transparent textStyle={{ color: '#87838B' }}>
                                                <Icon name="address" type="Entypo" />
                                                <Text style={{ fontSize: 16 }}>{address}</Text>
                                            </NativeButton>
                                            <NativeButton transparent textStyle={{ color: '#87838B' }}>
                                                <Icon name="phone" type="AntDesign" />
                                                <Text style={{ fontSize: 16 }}>{phoneNumber}</Text>
                                            </NativeButton>
                                        </Left>
                                    </CardItem>
                                </Card>

                                <View style={{ flex: 0.6 }}>
                                    <List>
                                        <FlatList
                                            data={tempratureRecord}
                                            renderItem={({ item, index }) => (
                                                <ListItem style={{ flexDirection: 'row', justifyContent: "space-between" }} key={`${index}`}>
                                                    <Text style={{ color: "#fff" }}>{`Fever : ${item.temprature} °F`}</Text>
                                                    <Text style={{ color: "#fff" }}>{`Date : ${new Date(item.created_at).toLocaleDateString()}`}</Text>
                                                </ListItem>
                                            )}

                                        />



                                    </List>
                                </View>
                            </Content>
                        )
                }
            </Container>
        );
    }
}
export { UserDetail }