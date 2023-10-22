import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import SideBar from './SideBar';

export default class Layout extends React.PureComponent<{ children?: React.ReactNode }> {
    constructor(context: any, props: any) {
        super(context, props)
        this.state = {
            IsOpen: true
        } as any;
        this.handleSideBar = this.handleSideBar.bind(this);
    }

    handleSideBar(event: any) {
        event.preventDefault();

        const { IsOpen } = this.state as any;

        this.setState({ IsOpen: !IsOpen })
    }

    public render() {
        const { IsOpen } = this.state as any;

        return (
            <React.Fragment>
                {window.location.pathname !== "/login" && (
                    <SideBar toggle={this.handleSideBar} isOpen={IsOpen} />
                )}
                <Container>
                    {window.location.pathname !== "/login" && (
                        <div>
                            <NavMenu toggle={this.handleSideBar} />
                        </div>
                    )}
                    {this.props.children}
                </Container>
            </React.Fragment>
        );
    }
}