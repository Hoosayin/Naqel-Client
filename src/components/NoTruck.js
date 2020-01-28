import React, { Component } from "react";
import AddTruck from "./AddTruck";

class NoTruck extends Component {
    constructor() {
        super();

        this.state = {
            AddTruck: null,
        };

        this.onAddTruckPopupCreate = this.onAddTruckPopupCreate.bind(this);
        this.onAddTruckPopupRemove = this.onAddTruckPopupRemove.bind(this);
    }

    onAddTruckPopupRemove = () => {
        this.setState({
            AddTruck: null,
        });
    }

    onAddTruckPopupCreate = () => {
        this.setState({
            AddTruck: (<AddTruck Show={true} OnAddTruckPopupRemove={this.onAddTruckPopupRemove} />),
        });
    }

    render() {
        return (
            <div>
                <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block" alt="add_truck.png" src="./images/add_truck.png"
                                    data-source-index="2" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">Truck Management</div>
                                <div class="type-sh3">You have not added any truck yet.</div>
                                <p>Adding your truck will let the Traders or Brokers see details about your truck. Valid and complete details of your truck make more chances for you to receive job requests.</p>
                                <div class="btn-group">
                                    <button class="btn btn-primary" onClick={this.onAddTruckPopupCreate }>Add Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary btn-lg"
                        data-toggle="modal"
                        data-target="#modal-sample">
                        Launch demo dialog
        </button>
                </div>
                <div class="modal" id="modal-sample"
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="modal-sample-label">
                                    Dialog title
                    </h4>
                            </div>
                            <div class="modal-body">
                                In Yorkshire, Johnny lives on the family farm with his father, Martin, and grandmother, Deirdre. Due to his father having suffered from a stroke, and his grandmother's age, much of the day-to-day running of the farm falls to Johnny. In his social time, Johnny engages in binge drinking and furtive sexual encounters with other men. Returning late to the farm after such an encounter with a young auctioneer, he is berated by his father because a calf has died from a breech birth in his absence.

Gheorghe, a Romanian migrant worker, is hired as extra help for the lambing season. He arrives and spends his first night in a caravan that the family has organised as his accommodation. As the ewes have moved away from the main part of the farm, and as part of the farm's boundary wall remains unrepaired by Johnny, it is decided that Johnny and Gheorghe should spend several days camping nearer to the animals. When one of the ewes gives birth to an unconscious runt, Johnny is intrigued when Gheorghe is able to resuscitate and care for it. One morning, after Johnny refers to Gheorghe yet again as a "gypsy", Gheorghe tackles him to the ground and warns Johnny not to speak that way to him again.

The next day, the two men again engage in a fight which results in Johnny performing fellatio on Gheorghe and the two men have rough and passionate sex in the dirt. While Johnny initially does not acknowledge the encounter, the two share cigarettes and a sugar packet[4] for their cup noodles throughout the day. That night, Gheorghe resists Johnny's aggressive move to have sex, instead patiently showing him that sex can also be tender, and the two men kiss for the first time.

Returning to the farm, Johnny invites Gheorghe to stay with him in the house, but Gheorghe elects to remain in the caravan. When Martin suffers a second stroke, Johnny realises that the running of the farm is now entirely his responsibility, and asks Gheorghe if he will stay with him. When Gheorghe expresses uncertainty over whether they can stay together and maintain the farm simultaneously, Johnny reacts poorly, drinking to excess and engaging in another random sexual encounter. When Gheorghe realises what Johnny has done, he abruptly leaves the farm.

Martin is released from the hospital, but is now fully debilitated. Johnny, desperate to make up with Gheorghe, tells his father that he will stay to run the farm, but that things must be run on his terms. Martin gives his tacit approval to Johnny, who sets off to bring Gheorghe back to the farm. After he finds Gheorghe working in Scotland, the two men reconcile. Gheorghe returns with Johnny; the caravan is taken away, and Gheorghe moves into the house.[5][6]
                                In Yorkshire, Johnny lives on the family farm with his father, Martin, and grandmother, Deirdre. Due to his father having suffered from a stroke, and his grandmother's age, much of the day-to-day running of the farm falls to Johnny. In his social time, Johnny engages in binge drinking and furtive sexual encounters with other men. Returning late to the farm after such an encounter with a young auctioneer, he is berated by his father because a calf has died from a breech birth in his absence.

Gheorghe, a Romanian migrant worker, is hired as extra help for the lambing season. He arrives and spends his first night in a caravan that the family has organised as his accommodation. As the ewes have moved away from the main part of the farm, and as part of the farm's boundary wall remains unrepaired by Johnny, it is decided that Johnny and Gheorghe should spend several days camping nearer to the animals. When one of the ewes gives birth to an unconscious runt, Johnny is intrigued when Gheorghe is able to resuscitate and care for it. One morning, after Johnny refers to Gheorghe yet again as a "gypsy", Gheorghe tackles him to the ground and warns Johnny not to speak that way to him again.

The next day, the two men again engage in a fight which results in Johnny performing fellatio on Gheorghe and the two men have rough and passionate sex in the dirt. While Johnny initially does not acknowledge the encounter, the two share cigarettes and a sugar packet[4] for their cup noodles throughout the day. That night, Gheorghe resists Johnny's aggressive move to have sex, instead patiently showing him that sex can also be tender, and the two men kiss for the first time.

Returning to the farm, Johnny invites Gheorghe to stay with him in the house, but Gheorghe elects to remain in the caravan. When Martin suffers a second stroke, Johnny realises that the running of the farm is now entirely his responsibility, and asks Gheorghe if he will stay with him. When Gheorghe expresses uncertainty over whether they can stay together and maintain the farm simultaneously, Johnny reacts poorly, drinking to excess and engaging in another random sexual encounter. When Gheorghe realises what Johnny has done, he abruptly leaves the farm.

Martin is released from the hospital, but is now fully debilitated. Johnny, desperate to make up with Gheorghe, tells his father that he will stay to run the farm, but that things must be run on his terms. Martin gives his tacit approval to Johnny, who sets off to bring Gheorghe back to the farm. After he finds Gheorghe working in Scotland, the two men reconcile. Gheorghe returns with Johnny; the caravan is taken away, and Gheorghe moves into the house.[5][6]
                                In Yorkshire, Johnny lives on the family farm with his father, Martin, and grandmother, Deirdre. Due to his father having suffered from a stroke, and his grandmother's age, much of the day-to-day running of the farm falls to Johnny. In his social time, Johnny engages in binge drinking and furtive sexual encounters with other men. Returning late to the farm after such an encounter with a young auctioneer, he is berated by his father because a calf has died from a breech birth in his absence.

Gheorghe, a Romanian migrant worker, is hired as extra help for the lambing season. He arrives and spends his first night in a caravan that the family has organised as his accommodation. As the ewes have moved away from the main part of the farm, and as part of the farm's boundary wall remains unrepaired by Johnny, it is decided that Johnny and Gheorghe should spend several days camping nearer to the animals. When one of the ewes gives birth to an unconscious runt, Johnny is intrigued when Gheorghe is able to resuscitate and care for it. One morning, after Johnny refers to Gheorghe yet again as a "gypsy", Gheorghe tackles him to the ground and warns Johnny not to speak that way to him again.

The next day, the two men again engage in a fight which results in Johnny performing fellatio on Gheorghe and the two men have rough and passionate sex in the dirt. While Johnny initially does not acknowledge the encounter, the two share cigarettes and a sugar packet[4] for their cup noodles throughout the day. That night, Gheorghe resists Johnny's aggressive move to have sex, instead patiently showing him that sex can also be tender, and the two men kiss for the first time.

Returning to the farm, Johnny invites Gheorghe to stay with him in the house, but Gheorghe elects to remain in the caravan. When Martin suffers a second stroke, Johnny realises that the running of the farm is now entirely his responsibility, and asks Gheorghe if he will stay with him. When Gheorghe expresses uncertainty over whether they can stay together and maintain the farm simultaneously, Johnny reacts poorly, drinking to excess and engaging in another random sexual encounter. When Gheorghe realises what Johnny has done, he abruptly leaves the farm.

Martin is released from the hospital, but is now fully debilitated. Johnny, desperate to make up with Gheorghe, tells his father that he will stay to run the farm, but that things must be run on his terms. Martin gives his tacit approval to Johnny, who sets off to bring Gheorghe back to the farm. After he finds Gheorghe working in Scotland, the two men reconcile. Gheorghe returns with Johnny; the caravan is taken away, and Gheorghe moves into the house.[5][6]
                </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">
                                    Button
                    </button>
                                <button type="button" class="btn btn-info"
                                    data-dismiss="modal">
                                    Cancel
                    </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.AddTruck}
            </div>
        );
    }
};

export default NoTruck;