import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'animate.css';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[50],
  },
}));

const TruncatedTableCell = styled(TableCell)(({ theme }) => ({
  maxWidth: '150px', // Adjust as needed
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [editedBusiness, setEditedBusiness] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/home')
        setLoading(false);
        return;
      }

      try {
        const url = `http://127.0.0.1:8000/api/business?page=${page}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data;
        setBusinesses(data.data);
        setTotalPages(data.pagination.last_page);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch businesses.');
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [page]);

  const handleAction = async (action, business) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please log in first.');
      return;
    }

    if (action === 'view') {
      navigate(`/view-business/${business.id}`);
    } else if (action === 'edit') {
      setCurrentBusiness(business);
      setEditedBusiness(business);
      setShowEditModal(true);
    } else if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this business?')) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/business/delete/${business.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            alert('Business deleted successfully!');
            setBusinesses(businesses.filter(b => b.id !== business.id));
          } else {
            alert('Failed to delete business');
          }
        } catch (error) {
          alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
        }
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please log in first.');
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/business/${currentBusiness.id}`, editedBusiness, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert('Business updated successfully!');
        setBusinesses(businesses.map(b => b.id === currentBusiness.id ? editedBusiness : b));
        setShowEditModal(false);
      } else {
        alert('Failed to update business');
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
    }
  };

  const handlePageChange = (event, newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom className="animate__animated animate__fadeInDown">
        Business Details
      </Typography>
      <TableContainer component={Paper} className="animate__animated animate__fadeIn">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Business Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Website</StyledTableCell>
              <StyledTableCell>Products And Services</StyledTableCell>
              <StyledTableCell>Is Approved</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TransitionGroup component={null}>
              {businesses.length > 0 ? (
                businesses.map(business => (
                  <CSSTransition key={business.id} timeout={500} classNames="animate__animated animate__fadeInUp">
                    <StyledTableRow>
                      <TruncatedTableCell>{business.business_name}</TruncatedTableCell>
                      <TruncatedTableCell>{business.address}</TruncatedTableCell>
                      <TruncatedTableCell>{business.city}</TruncatedTableCell>
                      <TruncatedTableCell>{business.phone_number}</TruncatedTableCell>
                      <TruncatedTableCell>{business.website}</TruncatedTableCell>
                      <TruncatedTableCell>{business.keywords}</TruncatedTableCell>
                      <TruncatedTableCell>{business.is_approved ? 'Approved' : 'Not Approved'}</TruncatedTableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => handleAction('view', business)}
                          sx={{ marginRight: 1 }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => handleAction('edit', business)}
                          sx={{ marginRight: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleAction('delete', business)}
                        >
                          Delete
                        </Button>
                      </TableCell>

                    </StyledTableRow>
                  </CSSTransition>
                ))
              ) : (
                <StyledTableRow>
                  <TableCell colSpan={8} align="center">No businesses found</TableCell>
                </StyledTableRow>
              )}
            </TransitionGroup>
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <IconButton onClick={handleFirstPage} disabled={page === 1} color="primary">
          <FirstPageIcon />
        </IconButton>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        <IconButton onClick={handleLastPage} disabled={page === totalPages} color="primary">
          <LastPageIcon />
        </IconButton>
      </PaginationContainer>

      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Business
        </DialogTitle>
        <DialogContent>
          <TextField
            name="business_name"
            label="Business Name"
            value={editedBusiness.business_name || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="address"
            label="Address"
            value={editedBusiness.address || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="city"
            label="City"
            value={editedBusiness.city || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="phone_number"
            label="Phone Number"
            value={editedBusiness.phone_number || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="website"
            label="website"
            value={editedBusiness.website || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="keywords"
            label="Products And Services"
            value={editedBusiness.keywords || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="is_approved"
                checked={editedBusiness.is_approved || false}
                onChange={e => handleEditChange({ target: { name: 'is_approved', value: e.target.checked } })}
              />
            }
            label="Approved"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditModal(false)} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessList;
