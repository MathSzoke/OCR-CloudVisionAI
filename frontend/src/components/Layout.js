import React, { Component } from 'react';
import { Home } from './Home/Home';
import { SwitchTheme } from './SwitchTheme/SwitchTheme';

export class Layout extends Component
{
    static displayName = Layout.name;

    render()
    {
        const toggleTheme = () => { document.body.dataset.bsTheme = document.body.dataset.bsTheme === "light" ? "dark" : "light"; };
        return (
            <div>
                <SwitchTheme onClick={toggleTheme}/>
                <Home />
            </div>
        );
    }
}