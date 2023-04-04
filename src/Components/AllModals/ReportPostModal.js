import React from "react";

export default function ReportPostModal(props) {
	const handleKeyDownMainComment = (e) => {
		if (e.key === "Enter") {
			props.SetSomethingElse(e.target.value)
			props.doReportPost()
		}
	};
	return (
		<div className="row">
			<div className="col-12">
				<div className="report-post-body">
					<div>
						<h6>Reason for reporting </h6>
						<p>Your report is anonymous. If someone is in immadiat danger, call the local emergency services, don’t wait</p>
					</div>
					<div className="mt-3">
						<bdi className="d-block position-relative">
							<select className="form-control comn-input-style form-select ps-3" onChange={(e) => props.setReportValue(e.target.value)}>
								<option selected>YOU HAVE TO SELECT ANY OPTION</option>
								<option value="False information">False information</option>
								<option value="It's Spam">It's Spam</option>
								<option value="Nudity or sexual content">Nudity or sexual content</option>
								<option value="Hate speech or symbols">Hate speech or symbols</option>
								<option value="Bulliying or harassment">Bulliying or harassment</option>
								<option value="Violence or dangerous organization">Violence or dangerous organization</option>
								<option value="Scam or fraud">Scam or fraud</option>
								<option value="Something else">Something else</option>
							</select>
						</bdi>
						{( props.reportValue === "Something else") && <div className="my-2"><input type='text' className="form-control comn-input-style ps-3 mt-3" placeholder="Write Here..." onKeyDown={handleKeyDownMainComment} /></div>}
					</div>
					<div className="mt-3">
						<button className="comn-btn-class mt-3" onClick={props.doReportPost}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
