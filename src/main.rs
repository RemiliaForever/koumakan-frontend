use yew::{html, Component, ComponentLink, Html, ShouldRender};

mod router;
mod views;

struct App {}

enum Msg {}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    fn create(_: Self::Properties, _: ComponentLink<Self>) -> Self {
        App {}
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn view(&self) -> Html<Self> {
        html! {
            <div id="app">
                <router::Router/>
            </div>
        }
    }
}

fn main() {
    yew::start_app::<App>();
}
