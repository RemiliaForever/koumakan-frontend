use stdweb::web::{window, Window};
use yew::services::ConsoleService;
use yew::{html, Component, ComponentLink, Html, Properties, ShouldRender};

use crate::views;

pub struct Router {
    window: Window,
    console: ConsoleService,
    child: Child,
}

pub enum Msg {
    Reload,
}

pub enum Child {
    Index,
    Admin,
}

#[derive(Properties, Default, Clone, Debug, PartialEq)]
pub struct RouterProps {
    path: String,
}

impl Component for Router {
    type Message = Msg;
    type Properties = RouterProps;

    fn create(_p: Self::Properties, _: ComponentLink<Self>) -> Self {
        let r = Router {
            child: Child::Index,
            console: ConsoleService::new(),
            window: window(),
        };
        // window().add_event_listener(move |event: PopStateEvent| {
        //     r.update(Msg::Reload);
        // });
        r
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Reload => {
                if let Some(l) = self.window.location() {
                    if let Ok(p) = l.pathname() {
                        let routes = p.trim_matches('/').split("/").collect::<Vec<&str>>();
                        match routes[0] {
                            "index" => self.child = Child::Index,
                            "admin" => self.child = Child::Admin,
                            _ => self.child = Child::Index,
                        }
                        true
                    } else {
                        self.console.error("get path error!");
                        false
                    }
                } else {
                    self.console.error("get location error!");
                    false
                }
            }
        }
    }

    fn view(&self) -> Html<Self> {
        match self.child {
            Child::Index => html! {
                <views::Index on_signal=|t| t/>
            },
            Child::Admin => html! {
                <views::Admin on_signal=|t| t/>
            },
        }
    }
}
