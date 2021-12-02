import React, { useEffect, useRef, useState } from "react";
import Erg from "../../../components/Erg";
import CopiableAddress from "./CopiableAddress";
import CountDown from "./CountDown";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from "react-toastify";
import * as constant from "../../../statics";
import StepDisplay from "./StepDisplay";

let intervalItem = null

class FinishModal extends React.Component {
    state = {
        interval: 0,
    }
    closeModal = () => {
        this.props.close();
        if (intervalItem) {
            clearInterval(intervalItem)
        }
    }

    componentDidUpdate = () => {
        if(!intervalItem) {
            intervalItem = setInterval(() => {
                this.setState(state => ({...state, interval: state.interval + 1}));
            }, 1000)
        }
    }

    render = () => {
        const remainingSeconds = Math.max(0, Math.floor(this.props.deadline - (Date.now() - this.props.start) / 1000));
        if (remainingSeconds === 0) {
            clearInterval(intervalItem);
            intervalItem = null;
        }
        const percent = 100 * remainingSeconds / this.props.deadline;
        return (
            <React.Fragment>
                <div
                    className={"modal fade" + (this.props.show ? " show" : "")}
                    tabIndex="-1"
                    style={{display: this.props.show ? "block" : "none"}}
                    aria-labelledby="donationModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-3">
                            <div className="modal-header">
                                <p className="donation-modal-instruction">
                                    Copy the Address from below and Send&nbsp;
                                    <CopyToClipboard text={this.props.amount / constant.ERG_FACTOR}
                                                     onCopy={() => toast('Copied')}>
                                        <b className={'cursor-pointer'}>
                                            exactly <Erg erg={this.props.amount} shouldDisplay={true}/>
                                        </b>
                                    </CopyToClipboard>
                                    &nbsp;to it.
                                </p>

                                <button
                                    onClick={this.closeModal}
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <CopiableAddress address={this.props.address}/>
                                {this.props.children}
                                <CountDown
                                    remainingSeconds={remainingSeconds}
                                    percent={percent}
                                />
                                <StepDisplay
                                    stepTitle={this.props.stepTitle}
                                    status={this.props.status}
                                    totalStatus={this.props.status === 'expired' ? null : 3}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"modal-backdrop fade" + (this.props.show ? " show" : "")} onClick={this.closeModal}/>
            </React.Fragment>
        )
    }
}

export default FinishModal;
