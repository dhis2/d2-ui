import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Reply from '@material-ui/icons/Reply';
import Create from '@material-ui/icons/Create';
import Share from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
import Launch from '@material-ui/icons/Launch';
import i18n from '@dhis2/d2-i18n';
import styles from './styles/Icons.style';

export default {
	visibility: { 
		icon: <Visibility style={styles.interpretationCommentIcon}/>, 
		tooltip: i18n.t('View') 
	},
	visibilityOff: { 
		icon: <VisibilityOff style={styles.interpretationCommentIcon} />, 
		tooltip: i18n.t('Exit View') 
	},
	like: { 
		icon: <ThumbUpIcon style={{...styles.interpretationCommentIcon, ...styles.unlikedThumbUp}} />, 
		tooltip: i18n.t('Like') 
	},
	unlike: { 
		 icon: <ThumbUpIcon style={{...styles.interpretationCommentIcon, ...styles.likedThumbUp}} />, 
		 tooltip: i18n.t('Unlike')  
	},
	reply: { 
		icon: <Reply style={styles.interpretationCommentIcon} />, 
		tooltip: i18n.t('Reply') 
	},
	edit: { 
		icon: <Create  style={styles.interpretationCommentIcon} />, 
		tooltip: i18n.t('Edit') 	
	},
	share: { 
		icon: <Share style={styles.interpretationCommentIcon} />, 
		tooltip: i18n.t('Manage sharing') },
	delete: { 
		icon: <Delete style={styles.interpretationCommentIcon} />, 
		tooltip: i18n.t('Delete') 
	},
	openApp: {
		icon: <Launch style={styles.interpretationCommentIcon}/>,
	},
}
