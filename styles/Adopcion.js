import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* BUSCADOR */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  /* CATEGORÍAS */
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryTabText: {
    fontSize: 12,
    fontWeight: '700',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },

  /* FILTROS DESPLEGABLES */
  dropdownSection: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  dropdownHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdownHeaderText: {
    fontSize: 13,
    fontWeight: '700',
  },
  activeBadge: {
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dropdownContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    gap: 8,
    paddingTop: 10,
  },
  subFilterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  subFilterTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  chipOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipOptionText: {
    fontSize: 11,
  },
  chipOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  /* RESULTADOS */
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  resetFiltersText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  /* SIN RESULTADOS */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySub: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  resetBtn: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  /* TARJETAS DE MASCOTAS */
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  badgeTop: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeTopText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  animalBreed: {
    fontSize: 12,
    fontWeight: '600',
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  specsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 11,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  /* MODAL DETALLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalHeaderSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
    borderRadius: 12,
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  modalInfoContainer: {
    flex: 1,
    gap: 5,
  },
  infoRow: {
    flexDirection: 'column',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalImage: {
    width: 105,
    height: 115,
    borderRadius: 12,
    borderWidth: 1,
  },
  healthContainer: {
    marginTop: 10,
    gap: 6,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  healthItem: {
    flexDirection: 'column',
  },
  healthLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  healthText: {
    fontSize: 11,
    marginTop: 1,
  },
  historyContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  historyLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  historyText: {
    fontSize: 11,
    lineHeight: 16,
  },
  modalAdoptButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalAdoptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalActionButtonText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default styles;
