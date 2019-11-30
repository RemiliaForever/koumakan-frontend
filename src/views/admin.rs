use stdweb::web::{window, History};
use yew::{html, Component, ComponentLink, Html, ShouldRender};
use yew::{Callback, Properties};

use crate::router;

pub struct Admin {
    history: History,
    on_signal: Callback<router::Msg>,
}

#[derive(Properties, PartialEq)]
pub struct Props {
    #[props(required)]
    pub on_signal: Callback<router::Msg>,
}

pub enum Msg {
    Do,
}

impl Component for Admin {
    type Message = Msg;
    type Properties = Props;

    fn create(p: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Admin {
            history: window().history(),
            on_signal: p.on_signal,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Do => {
                self.history.push_state((), "", Some("/index"));
                self.on_signal.emit(router::Msg::Reload);
                false
            }
        }
    }

    fn view(&self) -> Html<Self> {
        html! {
            <button onclick=|_| Msg::Do class="mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect">{ "Admin" }</button>
        }
    }
}
