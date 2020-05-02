import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button as NativeButton, Icon, Left, Body, Right, Title } from 'native-base';
import { userDetail } from "../apis"

const QRcolors = {
    0: "green",
    1: "yellow",
    2: "red"
}
class UserDetail extends Component {
    state = {
        user: {},
        loading: true
    }
    async  componentDidMount() {

        // const { route: { params: { id: userId } } } = this.props

        const response = await userDetail("5ea4b442c149580c8f92787c");
        if (response.status) {
            const { user } = response.data;
            this.setState({ user })
        }
        this.setState({ loading: false })
        console.log((response))
    }
    render() {

        const { user: { _id, fullName, joinDate, address, phoneNumber, status }, loading } = this.state;
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

                                <Card style={{ width: "90%", marginTop: 30, alignSelf: "center" }}>
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
                                            <NativeButton transparent textStyle={{ color: '#87838B' }}>
                                                <Icon name="options" type="SimpleLineIcons" />
                                            </NativeButton>
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
                                        {/* <Body>

                            </Body> */}

                                    </CardItem>
                                </Card>


                            </Content>
                        )
                }

            </Container>
        );
    }
}
export { UserDetail }